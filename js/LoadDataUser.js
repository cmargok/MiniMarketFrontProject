window.addEventListener('load', function () {

    // Verificar si hay información de inicio de sesión almacenada
    const username = sessionStorage.getItem('username');
    const usernameSpan = document.getElementById('username-span');
    const logOut = document.getElementById('logOut');
    const LoginNavButton = document.getElementById('LoginNavButton');
    const RegisterNavButton = document.getElementById('RegisterNavButton');
    if (username) {
        // Mostrar el nombre de usuario en la parte superior
        //userInfoContainer.innerHTML = `Bienvenido, ${username} | <a href="#" id="logout-link">Cerrar sesión</a>`;

        usernameSpan.textContent = `${username}`;
        usernameSpan.style.display = 'block';
        usernameSpan.style.fontSize = '2em'
        logOut.style.display = 'block';
        LoginNavButton.style.display = 'none';
        RegisterNavButton.style.display = 'none';

    } else {
        usernameSpan.style.display = 'none';
        logOut.style.display = 'none';
        LoginNavButton.style.display = 'flex';
        RegisterNavButton.style.display = 'flex';
    }


});

function logOut() {

    sessionStorage.removeItem('username');
    location.reload();

}