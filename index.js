// window.onload = loadTodos;

const todoInput = document.querySelector('input');
const addTodoBtn = document.querySelector(".addbtn");
const error = document.querySelector("#error")
const todoList = document.querySelector("ul");
const todoCount = document.querySelector("span")
const deleteAllTodo = document.querySelector(".clearAllTodosbtn");


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
    todos.unshift(todo);
    localStorage.setItem("todos", JSON.stringify(todos));  
    // update the todo list on the page
    renderTodos();
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
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can";
    deleteButton.appendChild(deleteIcon);
    li.appendChild(todoText);
    li.appendChild(deleteButton);
    todoList.appendChild(li);

    deleteButton.addEventListener("click", function () {
      todos.splice(i, 1);
      renderTodos();
      saveTodos();
    });
  }
  updateTodoCount();
}

/**
 * // function to delete a todo
function deleteTodo(todoItem) {
  const index = Array.from(todoList.children).indexOf(todoItem);
  // remove the todo from the list
  todos.splice(index, 1); 
  // update localStorage
  localStorage.setItem("todos", JSON.stringify(todos)); 
  // remove the todo from the page
  todoItem.remove(); 
  updateTodoCount();
} 
**/

// function to clear all todos
function clearTodos() {
  todos = [];
  // update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  // update the todo list on the page
  renderTodos(); 
}

// function to update the todo count in the footer
function updateTodoCount() {
  const count = todos.length;
  todoCount.textContent = count;
}

