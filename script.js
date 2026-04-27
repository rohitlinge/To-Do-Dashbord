let cards = document.querySelectorAll(".card");
let maincards = document.querySelector(".cards");
let page = document.querySelectorAll(".page");
let pages = document.querySelector(".pages");
let button = document.querySelectorAll(".back");

// -------- PAGE NAVIGATION --------
cards.forEach(function(eachcard){
  eachcard.addEventListener("click", function(){
    page[eachcard.id].style.display = "block";
    pages.style.display = "block";
    maincards.style.display = "none";
  });
});

button.forEach(function(btn){
  btn.addEventListener("click", function(){
    page[btn.id].style.display = "none";
    pages.style.display = "none";
    maincards.style.display = "flex";
  });
});

// -------- LOAD TASKS FUNCTION --------
function loadTasks() {
  let todoview = document.getElementById("todoview");

  let data = localStorage.getItem("tasklist");
  let tasklist = data ? JSON.parse(data) : [];

  todoview.innerHTML = "";

  tasklist.forEach(function(task){
    todoview.innerHTML += `
      <div class="taskbox">

        <h3>${task.addtodolistname}</h3>
        <span class="${task.taskimpchecker ? 'spanshouldbe' : 'spanremove'}">
  ${task.taskimpchecker ? 'Imp' : ''}
</span>

        <p>${task.addtodolistdec}</p>
        <button class="clearalltask" id="clearalltask">Clear Task</button>
      </div>
    `;
  });
}

// -------- FORM SUBMIT --------
let form = document.getElementById("form");

form.addEventListener("submit", function(val){
  val.preventDefault();

  let addtodolistname = document.querySelector("#addtodolistname").value;
  let addtodolistdec = document.querySelector("#addtodolistdec").value;
  let checkbox = document.getElementById("checkbox").checked

let taskimpchecker = "";

if (checkbox) {
  taskimpchecker = "IMP";
}

  let tasknew = {
    addtodolistname,
    addtodolistdec,
    taskimpchecker,

  };

  let data = localStorage.getItem("tasklist");
  let tasklist = data ? JSON.parse(data) : [];

  tasklist.push(tasknew);

  localStorage.setItem("tasklist", JSON.stringify(tasklist));

  form.reset();   // clear inputs
  loadTasks();    // refresh UI
});

// -------- INITIAL LOAD --------
loadTasks();

let todoview = document.getElementById("todoview");

todoview.addEventListener("click", function (e) {
  if(e.target.classList.contains("clearalltask")){

localStorage.removeItem("tasklist"); // only remove your tasks
    loadTasks(); // refresh UI
  }
});