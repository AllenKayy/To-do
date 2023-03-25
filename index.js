// window.onload = loadTasks;

const todoInput = document.querySelector('input');
const addTodoBtn = document.querySelector(".addbtn");
const error = document.querySelector("#error")
const todoList = document.querySelector("ul");
const todoCount = document.querySelector("span")
const deleteAllTodo = document.querySelector(".clearAllTodosbtn");

// const addBtn = () => {
//     if(todoInput === null || todoInput.length <= 0) {
//         addTodo.setAttribute("id", "active");
//         error.textContent = "Add your Todo!";
//         console.log(error.textContent = "Add your Todo!");
//     } else if (todoInput === "") {
//         // addTodo.setAttribute("id", "active");
//         addTodo.removeAttribute("id", "active");
//         console.log("todoInput")
//     }
// }


// check for stored todos in localStorage
let todos =JSON.parse(localStorage.getItem("todos")) || [];

// render the todos on the page
renderTodos();

// add event listeners
addTodoBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

todoList.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    deleteTodo(event.target.parentNode);
  }
});

todoList.addEventListener("mouseover", function(event) {
  if (event.target.tagName === "LI") {
    event.target.firstChild.style.display = "inline-block";
  }
});

todoList.addEventListener("mouseout", function(event) {
  if (event.target.tagName === "LI") {
    event.target.firstChild.style.display = "none";
  }
});

deleteAllTodo.addEventListener("click", clearTodos);

// function to add a todo
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = {
      text: todoText,
      completed: false,
      date: Date.now()
    };
    // error.removeAttribute("id", "error");
    todos.unshift(todo); // add the new todo to the beginning of the list
    localStorage.setItem("todos", JSON.stringify(todos)); // update localStorage
    renderTodos(); // update the todo list on the page
    todoInput.value = ""; // reset the input field
  } else if (todoText == null) {
    error.textContent = "Add your Todo!";
  }
}

// function to render the todos on the page
function renderTodos() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    const todoText = document.createTextNode(todo.text);
    const deleteButton = document.createElement("button");
    const deleteButtonText = document.createTextNode("X");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.style.display = "none";
    li.appendChild(deleteButton);
    li.appendChild(todoText);
    todoList.appendChild(li);
  }
  updateTodoCount();
}

// function to delete a todo
function deleteTodo(todoItem) {
  const index = Array.from(todoList.children).indexOf(todoItem);
  todos.splice(index, 1); // remove the todo from the list
  localStorage.setItem("todos", JSON.stringify(todos)); // update localStorage
  todoItem.remove(); // remove the todo from the page
  updateTodoCount();
}

// function to clear all todos
function clearTodos() {
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos)); // update localStorage
  renderTodos(); // update the todo list on the page
}

// function to update the todo count in the footer
function updateTodoCount() {
  const count = todos.length;
  todoCount.textContent = count;
}

