const addBtn = document.getElementById("add-button");
const input = document.getElementById("input-field");
let itemList = document.getElementById("item-list");

document.addEventListener("DOMContentLoaded", function () {
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  shoppingList.forEach((item) => {
    addItem(item);
  });
});

function clearList() {
  itemList.innerHTML = "";
}

function clearItem() {
  input.value = "";
}

function addItem(item) {
  let itemValue = item;

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", () => {
    deleteItemFromLocalStorage(itemValue);
    newEl.remove();
  });

  itemList.appendChild(newEl);
}

function saveToLocalStorage(item) {
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  shoppingList.push(item);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function deleteItemFromLocalStorage(item) {
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  let index = shoppingList.indexOf(item);
  if (index > -1) {
    shoppingList.splice(index, 1);
  }
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

addBtn.addEventListener("click", () => {
  let inputValue = input.value;
  // Disallow empty input
  if (inputValue === "") {
    return;
  }

  // Add item to DOM list
  addItem(inputValue);

  // Save item to localStorage
  saveToLocalStorage(inputValue);

  // Clear input field after click
  clearItem();
});
