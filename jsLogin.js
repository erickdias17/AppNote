function myMenuFunction() {
    var i = document.getElementById("navMenu"); // Corrigido getElementById
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.querySelector(".submit"); // Botão "Criar conta"
    const registerError = document.createElement("div");
    const registerSuccess = document.createElement("div");

    // Adiciona mensagens de erro e sucesso no DOM
    const formBox = document.querySelector(".form-box");
    formBox.appendChild(registerError);
    formBox.appendChild(registerSuccess);

    // Estilização básica para mensagens
    registerError.style.color = "red";
    registerError.style.display = "none";
    registerSuccess.style.color = "green";
    registerSuccess.style.display = "none";

    // Clique no botão "Criar conta"
    registerButton.addEventListener("click", (event) => {
        event.preventDefault(); // Impede o comportamento padrão do botão

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Verifica se os campos estão preenchidos
        if (!username || !email || !password) {
            registerError.textContent = "Por favor, preencha todos os campos.";
            registerError.style.display = "block";
            registerSuccess.style.display = "none";
            return;
        }

        // Chama a função addUser do auth.js
        if (addUser(username, password, email)) {
            registerError.style.display = "none";
            registerSuccess.textContent = "Conta criada com sucesso!";
            registerSuccess.style.display = "block";

            // Limpa os campos após o sucesso
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            // Redireciona para login (opcional)
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000); // Redireciona após 2 segundos
        } else {
            registerError.textContent = "O nome de usuário ou email já existe!";
            registerError.style.display = "block";
            registerSuccess.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".login-btn");

    // Verifica se uma conta existe no LocalStorage
    function accountExists(username, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.some(user => user.username === username && user.password === password);
    }

    // Função de login
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();

        const username = document.querySelector(".input-field[placeholder='Nome de Usuário']").value.trim();
        const password = document.querySelector(".input-field[placeholder='Senha']").value.trim();

        if (!username || !password) {
            alert("Por favor, preencha todos os campos antes de entrar.");
            return;
        }

        if (accountExists(username, password)) {
            localStorage.setItem("loggedInUser", username);
            alert(`Bem-vindo(a), ${username}!`);
            window.location.href = "index.html"; // Página principal
        } else {
            alert("Usuário ou senha incorretos.");
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript carregado com sucesso!');

    // Seleciona os elementos
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');

    // Debug: Verifique se os elementos existem
    if (usernameInput) console.log('Campo de usuário encontrado!');
    if (passwordInput) console.log('Campo de senha encontrado!');
    if (submitBtn) console.log('Botão de envio encontrado!');

    // Adiciona o evento de clique no botão
    submitBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
    
        if (!username || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    
        // Verifica se o usuário existe no LocalStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(user => user.username === username && user.password === password);
    
        if (userExists) {
            // Armazena o usuário logado
            localStorage.setItem("loggedInUser", username);
            alert(`Bem-vindo(a), ${username}!`);
    
            // Redireciona para a página principal
            window.location.href = 'index.html';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });
    
});



