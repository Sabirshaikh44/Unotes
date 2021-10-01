console.log("Welcome to the project of Unotes , you can do it!");
/*noteTxt, addBtn ,notes*/
showNotes();
// user enter notes here will add it when it will be clicked:
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let noteTitle = document.getElementById("noteTitle");
  let noteTxt = document.getElementById("noteTxt");
  // getting notes from localstorage:
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    //JSON.Parse use to convert the coming values from any web or user input into the object.
    notesObj = JSON.parse(notes);
  }
  myObj = {
    noteTitle: noteTitle.value,
    noteTxt: noteTxt.value,
  };
  // check if user input something then only create a note card else inform to write something:
  if (noteTxt.value && noteTitle.value != 0) {
    //Push the value user entered into the notesObj[] object:
    notesObj.push(myObj);
    noteTxt.classList.remove("border-danger");
    noteTitle.classList.remove("border-danger");
    noteTxt.placeholder = "Write notes here...";
  } else {
    noteTxt.classList.add("border-danger");
    noteTitle.classList.add("border-danger");
    noteTxt.placeholder = "please enter something";
  }

  //Updating the local storage and setting the value their:
  //to converts that coming data-which is in object into the string.
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // value will be resetted into box,so previously entered value will not appear into the textarea again:
  noteTitle.value = "";
  noteTxt.value = "";
  showNotes();
});

//Function to add inputnote and show notes into the cards:
function showNotes() {
  // getting notes from localstorage:
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    //JSON.Parse use to convert the coming values from any web or user input into the object.
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

// fucntion to delete a note:
function deleteNote(index) {
  let noteTxt = document.getElementById("noteTxt");
  // getting notes from localstorage:
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    //JSON.Parse use to convert the coming values from any web or user input into the object.
    notesObj = JSON.parse(notes);
  }
  // this will delete the note by index:
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Search functionality to find note:
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
