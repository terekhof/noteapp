const popup = document.querySelector('.modal');
const noteForm = document.querySelector('.modal-form');
const noteTable = document.querySelector('.app__elements');
const cancel = document.querySelector('.cancel-btn');
 
let noteDeleteButtons;
let noteList = JSON.parse(localStorage.getItem('notes'));

if(noteList !== null){
  appendNotes();
}

noteForm.addEventListener('submit', (e)=> {
  addNote(e);
});

function closeModal() {
  popup.style.display = "none";
}

function addNote(e){
  e.preventDefault();

  let newNote = {};

  let title = document.querySelector('.modal__input');
  let note = document.querySelector('.modal__input-textarea');

  if(title.value == '' || note.value == ''){
    return alert('Please enter both fields.');
  } else {
    newNote.title = title.value;
    newNote.note = note.value;
  }

  title.value = '';
  note.value = '';

  noteList.push(newNote);
  appendNotes();
  closeModal();
}

function appendNotes() {
  let notes = Array.from(document.querySelectorAll('.app__element'));
  if(notes.length > 0){
    notes.forEach(note =>{
      note.remove();
    })
  }

  noteList.map(note => {
    let element = document.createElement('li');
    element.classList = 'app__element';
    let elementTitle = document.createElement('h2');
    elementTitle.innerText = note.title;
    elementTitle.classList = 'app__title';
    let elementNote = document.createElement('p');
    elementNote.innerText = note.note;
    elementNote.classList = 'app__note';
    let elementDelete = document.createElement('button');
    elementDelete.innerHTML = 'Delete';
    elementDelete.classList.add('delete-item');

    element.appendChild(elementTitle);
    element.appendChild(elementNote);
    element.appendChild(elementDelete);

    noteTable.appendChild(element);
    getDeleteButtons();
    localStorage.setItem('notes', JSON.stringify(noteList));
  })
}

function getDeleteButtons(){
  noteDeleteButtons = Array.from(document.querySelectorAll('.delete-item'));

  noteDeleteButtons.forEach(button =>{
    let noteTitle = button.previousSibling.previousSibling.innerText;
    button.addEventListener('click', () => {
      deleteNote(noteTitle);
    })
  })
}

function deleteNote(noteTitle){
  for(let i = 0; i < noteList.length; i++){
    if(noteList[i].title == noteTitle){
      noteList.splice(i, 1);
    }
  }
  localStorage.setItem('notes', JSON.stringify(noteList));
  appendNotes();
}