"use strict";

const submitBtn = document.getElementById("submit");
const inputField = document.getElementById("todoInput");
const inputPriority = document.getElementById("priority");
const todos = document.getElementById("todo-list");
const doneButton = document.querySelectorAll(".done");
const clearBtn = document.getElementById('clear-all');


// const clearBtn = document.getElementById("clear");

//==== Model



class Todo {
  constructor(text) {

    this.todoText = text;
    // this.priority = priority;
  }



  renderTodo() {
    const newTodo = document.createElement("div");
    const newText = document.createTextNode(`${this.todoText}`);
    const doneButton = document.createElement("BUTTON");
    doneButton.addEventListener('click', doneTodo);
    const deleteButton = document.createElement("BUTTON");
    deleteButton.addEventListener('click', deleteTodo);
    newTodo.classList.add("todo");
    doneButton.classList.add("done");
    doneButton.innerHTML = "Done";
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "Delete";

    newTodo.appendChild(newText);
    newTodo.appendChild(doneButton);
    newTodo.appendChild(deleteButton);
    todos.appendChild(newTodo);

    doneButton.addEventListener("click", doneTodo);
  }
}

// New todo
const newTodo = function () {
  let text = inputField.value;
  const todo = new Todo(text);
  todo.renderTodo();
  inputField.value = "";
};

const doneTodo = (e) => {
  let targetedTodo = e.target.closest(".todo");
  let targeteddone = e.target.closest(".done");
  // console.log(`${targetedTodo.id}`);
  // remove from array

  // list.splice(targetedIndex, 1);
  // console.log(list);
  // change styling
  targetedTodo.classList.add("strike");
  // targeteddone.classList.add("hide");
};

const deleteTodo = (e) => {
  let targetedTodo = e.target.closest(".todo");

  targetedTodo.remove();
  // targeteddone.classList.add("hide");
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // a function that creates a new todo
  if (inputField.value != "") {
    newTodo();
  } else {
    alert("Please Enter Todo Text");
  }
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // a function that removes all todos
  while (todos.firstChild) {
    todos.removeChild(todos.lastChild);
  }
});
