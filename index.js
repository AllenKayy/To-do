
const todoInput = document.querySelector('input');
const addTodoBtn = document.querySelector(".addbtn");
const error = document.querySelector("#error");
const todoList = document.querySelector("ul");
const todoCount = document.querySelector("span");
const deleteAllTodo = document.querySelector(".clearAllTodosbtn");

// check for stored todos in localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

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
    const li = event.target.parentNode;
    if (event.target.classList.contains("deleteBtn")) {
      deleteTodo(li);
    } else if (event.target.classList.contains("editBtn")) {
      editTodo(li);
    }
  }
});

deleteAllTodo.addEventListener("click", clearTodos);

// function to add a todo
function addTodo() {
  const todoText = todoInput.value.trim();
  error.textContent = "";
  if (todoText !== "") {
    const todo = {
      text: todoText,
      completed: false,
      date: Date.now()
    };
    todos.unshift(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    // update the todo list on the page
    renderTodos();
    // reset the input field
    todoInput.value = ""; 
  } else {
    error.textContent = "Add your Todo! 😒";
  }
}

// function to render the todos on the page
function renderTodos() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    li.setAttribute("data-id", i);
    const todoText = document.createElement("span");
    todoText.classList.add("todoText");
    todoText.textContent = todo.text;
    const buttonContainer = document.createElement("div"); 
    const editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    buttonContainer.appendChild(editButton); 
    buttonContainer.appendChild(deleteButton);
    li.appendChild(todoText);
    li.appendChild(buttonContainer); 
    todoList.appendChild(li);

    deleteButton.addEventListener("click", function() {
      deleteTodo(li);
    });

    editButton.addEventListener("click", function() {
      editTodo(li);
    });
  }
  updateTodoCount();
}

// function to delete a todo
function deleteTodo(todoItem) {
  const index = parseInt(todoItem.getAttribute("data-id"));
  // remove the todo from the list
  todos.splice(index, 1);
  // update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  // remove the todo from the page
  todoItem.remove();
  updateTodoCount();
}

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

// function to show edit todo form
function editTodo(todoItem) {
  const index = Array.from(todoList.children).indexOf(todoItem);
  const todo = todos[index];
  const todoText = todo.text;
  const newTodoText = prompt("Edit todo", todoText);
  if (newTodoText !== null && newTodoText.trim() !== "") {
    todo.text = newTodoText.trim();
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

