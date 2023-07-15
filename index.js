import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
    
    if (snapshot.exists()) {
        let data = Object.entries(snapshot.val());

        console.log(snapshot.val())

        clearList()

        for (let i = 0; i < data.length; i++) {
            let currentItem = data[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            addItem(currentItem)
        }
    } else {
        itemList.innerHTML = '';
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

    newEl.addEventListener('click', () => {
        remove(ref(database, `shoppingList/${itemID}`))
    })

    itemList.appendChild(newEl);
}




addBtn.addEventListener('click', () => { 
    let inputValue = input.value;
    //disallow empty input
    if (inputValue === '') {
        return;
    }
    //add item to DOM list 
    addItem(inputValue);


    //push item to database and 
    push(shoppingListInDB, inputValue);

    
    //clear input field after click
    clearItem();
});

