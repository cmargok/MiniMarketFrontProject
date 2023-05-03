
async function loginUser() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const userData = Object.fromEntries(formData.entries());

        login(userData)
            .then((response) => {
                let responser = MapToUser(response);
                sessionStorage.setItem("username", responser.username);
                window.location.href = "Index.html";
            })
            .catch((error) => {
                alert("El usuario no existe.");
            });
    });


}

window.addEventListener("DOMContentLoaded", loginUser);


async function login(req) {
    const { email, password } = req;
    const hashedPassword = await hashString(password);

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/Usuarios?email=${email}&password=${hashedPassword}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Email o contraseña incorrectos");
                }
                return response.json();
            })
            .then((data) => {

                let response = MapToUser(data[0]);

                let sesionU = Object.create(sesionUser);
                sesionU.usuario_id = response.id;
                sesionU.token = "MItOKENsITO00¿¿99#";

                fetch("http://localhost:3000/sesiones", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sesionU),
                })
                    .then(() => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}




let sesionUser = {
    id: "",
    usuario_id: "",
    token: "",
};


let UserBasic = {
    id: "",
    username: "",
};
function MapToUser(JsonData) {
    let Usr = Object.create(UserBasic);
    Usr.id = JsonData.id;
    Usr.username = JsonData.username;
    return Usr;
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
