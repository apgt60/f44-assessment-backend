const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const notesForm = document.getElementById("notes-add-form")
const notesEditForm = document.getElementById("notes-edit-form")
const notesDeleteForm = document.getElementById("notes-delete-form")
const notesContainer = document.getElementById("notesList")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const addNote = body => {
    console.log("addNote body:", body)
    axios.post("http://localhost:4000/api/addNote/", body)
        .then(res => {
            const data = res.data;
            console.log("addNote res.data:", data)
            displayNotes(data)
    });
};

const editNote = body => {
    console.log("editNote body:", body)
    axios.put("http://localhost:4000/api/editNote/", body)
        .then(res => {
            const data = res.data;
            console.log("editNote res.data:", data)
            displayNotes(data)
    })
    .catch(data => {
        console.log("errorData:", data)
        alert("ID not found")
    });
};

const deleteNote = body => {
    console.log("deleteNote body:", body)
    axios.delete("http://localhost:4000/api/deleteNote/"+body.id 
    , body)
        .then(res => {
            const data = res.data;
            console.log("deleteNote res.data:", data)
            displayNotes(data)
    })
    .catch(data => {
        console.log("errorData:", data)
        alert("ID not found")
    });
};

const getNotes = () => {
    axios.get("http://localhost:4000/api/getNotes/")
        .then(res => {
            const data = res.data;
            console.log("getNotes res.data:", data)
            displayNotes(data)
    });
};

function displayNotes(notes) {
    notesContainer.innerHTML = ``
    for (let i = 0; i < notes.length; i++) {
        const noteItem = document.createElement('li')
        noteItem.innerHTML = `<li class="note-item">${notes[i].id} : ${notes[i].text}</li>`
        notesContainer.appendChild(noteItem)
    }
  }

function addNoteSubmitHandler(e) {
    e.preventDefault()
    const textInput = document.getElementById("notes-add-input")
    addNote({text : textInput.value})
    textInput.value = ""
}  

function editNoteSubmitHandler(e) {
    e.preventDefault()
    const textInput = document.getElementById("notes-edit-text-input")
    const idInput = document.getElementById("notes-edit-id-input")
    editNote({text : textInput.value, id : idInput.value})
    textInput.value = ""
}  

function deleteNoteSubmitHandler(e) {
    e.preventDefault()
    const idInput = document.getElementById("notes-delete-id-input")
    deleteNote({id : idInput.value})
    idInput.value = ""
}         


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
notesForm.addEventListener('submit', addNoteSubmitHandler)
notesEditForm.addEventListener('submit', editNoteSubmitHandler)
notesDeleteForm.addEventListener('submit', deleteNoteSubmitHandler)

//initialize the page on first load with server data
getNotes()