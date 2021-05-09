"use strict";

const submitBtn = document.getElementById("submit");
const inputField = document.getElementById("todoInput");
const inputPriority = document.getElementById("priority");
const todos = document.getElementById("todo-list");
const deleteBtn = document.querySelectorAll(".delete");

//==== Model

let list = [];

class Todo {
  constructor(text) {
    this.id = list.length + 1;
    this.todoText = text;
    // this.priority = priority;
  }

  addToList() {
    list.push(this);
  }

  renderTodo() {
    const newTodo = document.createElement("div");
    const newText = document.createTextNode(`${this.todoText}`);
    const deleteBtn = document.createElement("BUTTON");
    newTodo.id = `${this.id}`;
    newTodo.classList.add("todo");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = "Done";

    newTodo.appendChild(newText);
    newTodo.appendChild(deleteBtn);
    todos.appendChild(newTodo);

    deleteBtn.addEventListener("click", deleteTodo);
  }

  deleteTodo() {}
}

// New todo

const newTodo = function () {
  let text = inputField.value;
  // determine priority value here
  const todo = new Todo(text, "priority");
  todo.addToList();
  todo.renderTodo();
  inputField.value = "";
  console.log(list);
};

const deleteTodo = (e) => {
  let targetedTodo = e.target.closest(".todo");
  console.log(`${targetedTodo.id}`);
  // remove from array
  let targetedIndex = targetedTodo - 1;
  list.splice(targetedIndex, 1);
  console.log(list);
  // remove from DOM
  targetedTodo.remove();
};

//==== View

//==== Controller

// this runs the code block when the submit button is clicked
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // a function that creates a new todo
  if (inputField.value != "") {
    newTodo();
  } else {
    alert("Please Enter Todo Text");
  }
});

// How can I use objects and where?
// List of features:
// Add Todo
// Edit Todo
// Delete Todo
//
// Wish List Features:
// Importance ranking of Todos
// Deadline Timer for Todos
