function registerUser() {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const userData = Object.fromEntries(formData.entries());
        const hashedPassword = await hashString(userData.password);

        userData.password = hashedPassword;
        // Enviar datos a la API para crear nuevo usuario
        fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Mostrar mensaje de éxito al usuario
                alert("Usuario creado exitosamente.");
                // Redirigir a página de inicio
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error:", error);
                // Mostrar mensaje de error al usuario
                alert("Ocurrió un error al crear el usuario.");
            });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    registerUser();
});


async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}