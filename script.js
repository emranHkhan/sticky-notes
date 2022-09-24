const addNoteBtn = document.querySelector('.add-note');
const noteContainer = document.querySelector('.note-container');
let noteArr = JSON.parse(localStorage.getItem('notes')) || [];

noteArr.forEach(({ id, content }) => {
  const noteElement = createNote(id, content);
  noteContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener('click', addNote);

function addNote() {
  const { id, content } = { id: Date.now(), content: '' };

  const note = createNote(id, content);

  noteContainer.insertBefore(note, addNoteBtn);

  noteArr.push({ id, content });

  saveNotes(noteArr);
}

function saveNotes(noteArr) {
  localStorage.setItem('notes', JSON.stringify(noteArr));
}

function createNote(id, content) {
  const d = new Date();
  const datestring =
    ('0' + d.getDate()).slice(-2) +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    d.getFullYear() +
    ' ';
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
       
              <textarea onchange="updateNote(this, ${id})" placeholder="Type your notes..." onfocus="handleFocus(this)" onblur="handleBlur(this)">${content}</textarea>
              <button onclick="deleteNote(this, ${id})" class="dlt-btn"><i class="trash fa-solid fa-trash"></i></button>
              <div class="time">${datestring}</div>
       
  `;

  return note;
}

function updateNote(textarea, id) {
  noteArr = noteArr.map((note) => {
    if (note.id === id) {
      note.content = textarea.value;
    }
    return note;
  });

  saveNotes(noteArr);
}

function deleteNote(btn, id) {
  const index = noteArr.findIndex((note) => note.id === id);
  noteArr.splice(index, 1);
  saveNotes(noteArr);
  noteContainer.removeChild(btn.parentNode);
}

function handleFocus(textarea) {
  textarea.parentNode.style.border = '1px solid red';
}

function handleBlur(textarea) {
  textarea.parentNode.style.border = 0;
}
