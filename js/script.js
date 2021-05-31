"use strict"

const rootEl = document.getElementById("root");



// data
// [] list
let list = [];

// {} todo
class Todo {
    constructor(t) {
        this.id = Date.now();
        this.todoText = t;
        this.isDone = false;
    }
    // () add to list
    addToList() {
        list.push(this);
    }
    // () delete from list
    deleteFromList() {
        list.splice((this.id), 1)
    }
    // () update todo
    updateTodo(u) {
        this.todoText = u
    }
    completeTodo() {

    }
}

const newTodo = function () {
    let t = inputField.value;
    const todo = new Todo(t);
    todo.addToList();
};

const clearTodos = function () {
    list = [];
}



// display
// el input field
// el add button
// el clear button

const logo = document.createElement("img");
const title = document.createElement("h1");
const credit = document.createElement("p");
const siteLink = document.createElement("a");
const inputForm = document.createElement("div");
const inputField = document.createElement("input");
const inputButton = document.createElement("input");
const clearButton = document.createElement("button");

logo.setAttribute("src", "todoLogo.svg")
title.textContent = "To-Do List";
siteLink.textContent = "Sam Bissell";
siteLink.href = "www.sbissell.com";
credit.textContent = "A CRUD to-do list by ";
inputField.setAttribute("type", "text")
inputButton.setAttribute("type", "submit")
inputButton.setAttribute("value", "Add Todo")


clearButton.textContent = "Clear All";

logo.classList.add("logo");
inputForm.classList.add("input-form");
inputField.classList.add("input-field");
inputButton.id = "input-button";
clearButton.classList.add("clear-button");

inputForm.appendChild(inputField);
inputForm.appendChild(inputButton);
inputForm.appendChild(clearButton);
credit.appendChild(siteLink);
rootEl.appendChild(logo);
rootEl.appendChild(title);
rootEl.appendChild(credit);
rootEl.appendChild(inputForm);

inputButton.addEventListener("click", () => {
    newTodo();
    refresh();
});
clearButton.addEventListener("click", () => {
    clearList();
    clearDisplay();
});

const renderTodo = (is, id, t) => {
    const elTodoBody = document.createElement("div");
    const elTodoText = document.createElement("h3");
    const elDone = document.createElement("button");
    const elEdit = document.createElement("button");
    const elDelete = document.createElement("button");


    elTodoBody.id = `${id}`;
    elTodoText.textContent = `${t}`;
    elDone.textContent = "Done";
    elEdit.textContent = "Edit";
    elDelete.textContent = "Delete";

    if (is) { elTodoBody.classList.add("complete"); };

    elTodoBody.classList.add("todo-body");
    elTodoText.classList.add("todo-text")
    elDone.classList.add("done");
    elEdit.classList.add("edit");
    elDelete.classList.add("delete");

    elDone.addEventListener("click", doneTodo);
    elEdit.addEventListener("click", editTodo);
    elDelete.addEventListener("click", deleteTodo);
    // elEditConfirm.addEventListener("click", confirmEdit); 

    elTodoBody.appendChild(elTodoText);
    elTodoBody.appendChild(elDone);
    elTodoBody.appendChild(elEdit);
    elTodoBody.appendChild(elDelete);
    rootEl.appendChild(elTodoBody);
};

// *************
// *************
// *************
// *************
// Need a target Index Function
const getTargetIndex = (e) => {
    let targetTodo = e.target.closest(".todo-body");
    let targetId = parseInt(targetTodo.id);
    let targetIndex = list.findIndex(x => x.id === targetId);
    return targetIndex;
}

const getTargetTodo = (e) => {
    let targetTodo = e.target.closest(".todo-body");
    return targetTodo;
}

const refresh = () => {
    clearDisplay();
    renderList();
}


const deleteTodo = (e) => {
    let myTarget = getTargetIndex(e)
    list.splice(myTarget, 1);
    refresh();
    // console.log(list);
};

const doneTodo = (e) => {
    let myTarget = getTargetIndex(e);
    if (list[myTarget].isDone) {
        list[myTarget].isDone = false;
    } else {
        list[myTarget].isDone = true;
    };
    refresh();
}


// const doneTodo = (e) => {

//     let targetTodo = e.target.closest(".todo-body");
//     let targetId = targetTodo.id;

//     let targetIndex = list.findIndex(x => {
//         x.id === targetId;

//     });


//     console.log(targetIndex);

//     // if (list[targetIndex].isDone) {
//     //     list[targetIndex].isDone = false;
//     // } else {
//     //     list[targetIndex].isDone = true;
//     // };
//     clearDisplay();
//     renderList();
// }

// let arr = [
//     {
//         id: 1234,
//         name: "sam"
//     },
//     {
//         id: 5678,
//         name: "bill"
//     },
//     {
//         id: 9012,
//         name: "fred"
//     }
// ];

// const index = list.findIndex(list => list.id === list[0]);


// console.log(index);
// console.log(arr[index]);

const editTodo = (e) => {

    let targetIndex = getTargetIndex(e);
    let targetElement = getTargetTodo(e);

    const elEditField = document.createElement("input");
    const elEditConfirm = document.createElement("button");

    elEditField.setAttribute("type", "text")
    elEditConfirm.textContent = "Confirm Change";

    elEditField.classList.add("edit-field");
    elEditConfirm.classList.add("edit-confirm");

    targetElement.appendChild(elEditField);
    targetElement.appendChild(elEditConfirm);

    elEditConfirm.addEventListener("click", (e) => {
        list[targetIndex].updateTodo(elEditField.value)
        clearDisplay();
        renderList();
    });
}

// doneTodo => change isDone to true
// editTodo => show editing field and button
// deleteTodo
// Confirm Edit


// () render list
const renderList = function () {
    for (let i = 0; i <= list.length - 1; i++) {
        renderTodo(list[i].isDone, list[i].id, list[i].todoText)
    };
}

const clearList = () => list = [];

const clearDisplay = function () {
    let todos = document.querySelectorAll(".todo-body");
    for (let i = 0; i <= todos.length - 1; i++) {
        rootEl.removeChild(todos[i]);
    }
    // clear input field
    inputField.value = "";
};

