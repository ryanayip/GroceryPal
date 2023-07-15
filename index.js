import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://grocerypal-955f0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById('add-button');
const input = document.getElementById('input-field');
let itemList = document.getElementById('item-list');

onValue(shoppingListInDB, function(snapshot) {
    let data = Object.entries(snapshot.val());

    console.log(snapshot.val())

    clearList()

    for (let i = 0; i < data.length; i++) {
        let currentItem = data[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        addItem(currentItem)
    }

 
})

function clearList() {
    itemList.innerHTML = '';
}

function clearItem() {
    input.value = '';
}

function addItem(item) {
    let itemID = item[0]
    let itemValue = item[1]

   
    let newEl = document.createElement('li');
    newEl.textContent = itemValue;
    itemList.appendChild(newEl);
}




addBtn.addEventListener('click', () => { 
    let inputValue = input.value;
    //disallow empty input
    if (inputValue === '') {
        return;
    }
    //add item to DOM list and log
    addItem(inputValue);
    console.log(`${inputValue} added to list`);

    //push item to database and log
    push(shoppingListInDB, inputValue);
    console.log(`${inputValue} added to database`);
    
    //clear input field after click
    clearItem();
});

