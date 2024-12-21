document.addEventListener("DOMContentLoaded", () => {
    const folderGrid = document.querySelector(".folder-grid");
    const addFolderBtn = document.getElementById("addFolderBtn");
    const notesContainer = document.querySelector(".notes");
    const noteGrid = document.querySelector(".note-grid");
    const addNoteBtnTemplate = document.querySelector(".add-note-item");

    // Função para obter dados do LocalStorage
    const getData = () => {
        const data = JSON.parse(localStorage.getItem("data")) || {};
        return data;
    };

    // Função para salvar dados no LocalStorage
    const saveData = (data) => {
        localStorage.setItem("data", JSON.stringify(data));
    };

    // Carregar pastas
    const loadFolders = () => {
        const data = getData();
        const folders = Object.keys(data);
        folderGrid.innerHTML = "";

        folders.forEach(folderName => {
            addFolder(folderName, false); // Adiciona a pasta visualmente
        });
    };

    // Adicionar uma nova pasta
    const addFolder = (folderName, save = true) => {
        if (!folderName.trim()) {
            alert("O nome da pasta não pode estar vazio.");
            return;
        }

        const folderItem = document.createElement("div");
        folderItem.classList.add("folder-item");
        folderItem.textContent = folderName;

        folderItem.addEventListener("click", () => {
            selectFolder(folderName);
        });

        folderGrid.appendChild(folderItem);

        if (save) {
            const data = getData();
            if (!data[folderName]) {
                data[folderName] = []; // Cria a pasta com uma lista de notas vazia
                saveData(data);
            } else {
                alert("Uma pasta com este nome já existe.");
            }
        }
    };

    // Selecionar pasta
    const selectFolder = (folderName) => {
        notesContainer.style.display = "block";
        localStorage.setItem("currentFolder", folderName);
        loadNotes(folderName);
    };

    // Carregar notas de uma pasta
    const loadNotes = (folderName) => {
        const data = getData();
        const notes = data[folderName] || [];

        noteGrid.innerHTML = "";
        noteGrid.appendChild(addNoteBtnTemplate); // Garante que o botão "Adicionar Nota" esteja presente

        notes.forEach((note, index) => {
            addNote(note.title, index, folderName);
        });

        // Adicionar funcionalidade ao botão "Adicionar Nota"
        addNoteBtnTemplate.addEventListener("click", () => {
            const title = prompt("Digite o título da nova nota:");
            if (title) {
                saveNoteToFolder(folderName, title);
            }
        });
    };

    // Adicionar uma nova nota
    const addNote = (title, index, folderName) => {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note-item");
        noteItem.textContent = title;

        noteItem.addEventListener("click", () => {
            localStorage.setItem("currentNoteIndex", index);
            localStorage.setItem("currentFolder", folderName);
            window.location.href = "editor.html";
        });

        noteGrid.insertBefore(noteItem, addNoteBtnTemplate);
    };

    // Salvar uma nova nota na pasta
    const saveNoteToFolder = (folderName, title) => {
        const data = getData();
        const notes = data[folderName] || [];
        const newNote = { title: title, content: "" };

        notes.push(newNote); // Adiciona a nova nota à lista
        data[folderName] = notes; // Atualiza as notas da pasta
        saveData(data); // Salva os dados no LocalStorage

        loadNotes(folderName); // Recarrega as notas
    };

    // Adicionar pasta ao clicar no botão
    addFolderBtn.addEventListener("click", () => {
        const folderName = prompt("Digite o nome da nova pasta:");
        if (folderName) addFolder(folderName);
    });

    // Carregar pastas ao iniciar
    loadFolders();
});
