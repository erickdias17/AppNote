document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".login-btn"); // Botão de login
    const registerButton = document.querySelector(".register-btn"); // Botão de registro

    // Função para salvar nova conta no localStorage
    function saveAccount(username, password) {
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        accounts.push({ username, password });
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    // Função para verificar se a conta existe
    function accountExists(username, password = null) {
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        return accounts.some(account => account.username === username && (!password || account.password === password));
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

    // Função de registro
    registerButton.addEventListener("click", (event) => {
        event.preventDefault();

        const username = document.querySelector(".input-field[placeholder='Nome de Usuário']").value.trim();
        const password = document.querySelector(".input-field[placeholder='Senha']").value.trim();

        if (!username || !password) {
            alert("Por favor, preencha todos os campos para se cadastrar.");
            return;
        }

        if (accountExists(username)) {
            alert("Usuário já existe. Por favor, escolha outro nome de usuário.");
            return;
        }

        saveAccount(username, password);
        alert("Conta criada com sucesso! Agora você pode fazer login.");
    });

    // Exibir o nome do usuário logado
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        const welcomeMessage = document.getElementById("welcomeMessage");
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bem-vindo(a), ${loggedInUser}!`;
        }
    }
});

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
const addUser = (username, password, email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica se o usuário já existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Nome de usuário já está em uso. Por favor, escolha outro.");
        return;
    }

    // Adiciona o novo usuário
    const newUser = { username, password, email };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));


    
    // Redireciona para o index.html

        window.location.href = "index.html";

};