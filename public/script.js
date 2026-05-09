const apiUrl = "/notes";

async function loadNotes() {
    const response = await fetch(apiUrl);
    const notes = await response.json();

    const notesContainer = document.getElementById("notesContainer");

    notesContainer.innerHTML = "";

    notes.forEach(note => {

        const div = document.createElement("div");

        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>

            <button onclick="deleteNote('${note._id}')">
                Delete
            </button>
        `;

        notesContainer.appendChild(div);
    });
}

async function addNote() {

    const title = document.getElementById("title").value;

    const description = document.getElementById("description").value;

    if(title === "" || description === "") {
        alert("Please fill all fields");
        return;
    }

    await fetch(apiUrl, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            description
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadNotes();
}

async function deleteNote(id) {

    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();
