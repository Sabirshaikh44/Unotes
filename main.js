showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let noteTitle = document.getElementById("noteTitle");
  let noteTxt = document.getElementById("noteTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  myObj = {
    noteTitle: noteTitle.value,
    noteTxt: noteTxt.value,
  };
  if (noteTxt.value && noteTitle.value != 0) {
    notesObj.push(myObj);
    noteTxt.classList.remove("border-danger");
    noteTitle.classList.remove("border-danger");
    noteTxt.placeholder = "Write notes here...";
  } else {
    noteTxt.classList.add("border-danger");
    noteTitle.classList.add("border-danger");
    noteTxt.placeholder = "please enter something";
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  noteTitle.value = "";
  noteTxt.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let card = "";
  notesObj.forEach(function (element, index) {
    card += ` <div class="noteCard card mx-2 my-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.noteTitle}</h5>
                        <p class="card-text">${element.noteTxt}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger w-100">Delete<i class="far fa-trash-alt mx-1"></i></button>
                    </div>
                </div>`;

  });
  let noteElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElem.innerHTML = card;
  } else {
    noteElem.innerHTML = `<p class="lead fw-light" style="font-size: 1.4rem";>No Notes found,Please add a note!</p>`;
  }
}

function deleteNote(index) {
  let noteTxt = document.getElementById("noteTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", function (e) {
  let searchValue = searchBox.value.toLowerCase();

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardsTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardsTxt.includes(searchValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
