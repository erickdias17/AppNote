document.addEventListener("DOMContentLoaded", () => {
    const noteContent = document.getElementById("noteContent");
    const saveButton = document.getElementById("saveNote");
    const backButton = document.getElementById("backToHome");

    const folderName = localStorage.getItem("currentFolder");
    const noteIndex = localStorage.getItem("currentNoteIndex");
    const data = JSON.parse(localStorage.getItem("data")) || {};
    const notes = data[folderName] || [];
    const currentNote = notes[noteIndex];

    // Carregar conteúdo da nota
    noteContent.value = currentNote.content;

    // Salvar conteúdo no localStorage
    saveButton.addEventListener("click", () => {
        const content = noteContent.value.trim();
        if (content) {
            currentNote.content = content;  // Atualiza o conteúdo da nota
            notes[noteIndex] = currentNote;  // Atualiza a nota no array de notas
            data[folderName] = notes;  // Atualiza a pasta com as notas
            localStorage.setItem("data", JSON.stringify(data));  // Salva as mudanças

            alert("Nota salva com sucesso!");
        } else {
            alert("Não é possível salvar uma nota vazia.");
        }
    });

    // Voltar à página inicial
    backButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Redireciona para a página inicial
    });
});
