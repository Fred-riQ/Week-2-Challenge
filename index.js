const shoppingListArr = JSON.parse(localStorage.getItem('shoppingList')) || []; // Load existing list
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-item');
const markItems = document.getElementById('mark-purchased');

// Function to render the shopping list from the array
function renderShoppingList() {
    itemList.innerHTML = ''; // Clear the current list
    shoppingListArr.forEach(item => {
        const newItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        // Restore checkbox state based on whether the item is marked as purchased
        checkbox.checked = item.purchased || false;

        // Toggle class on checkbox change
        checkbox.addEventListener('change', () => {
            newItem.classList.toggle('purchased', checkbox.checked);
            item.purchased = checkbox.checked; // Update the state in the array
            localStorage.setItem('shoppingList', JSON.stringify(shoppingListArr)); // Update localStorage
        });

        newItem.appendChild(checkbox);
        newItem.appendChild(document.createTextNode(item.name));
        newItem.classList.toggle('purchased', checkbox.checked); // Set the class based on state
        itemList.appendChild(newItem);
    });
}

renderShoppingList(); // Initial rendering of the list

addButton.addEventListener('click', () => {
    if (itemInput.value.trim() === '') return; // Prevent adding empty items

    const newItem = {
        name: itemInput.value,
        purchased: false // Default to not purchased
    };

    shoppingListArr.push(newItem);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListArr)); // Update localStorage

    renderShoppingList(); // Re-render the list
    itemInput.value = ''; // Clear the input
});

markItems.addEventListener('click', () => {
    const items = itemList.querySelectorAll('li');
    items.forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = true; // Mark checkbox as checked
            item.classList.add('purchased'); // Add purchased class
            shoppingListArr[index].purchased = true; // Update state in the array
        }
    });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListArr)); // Update localStorage
});

clearButton.addEventListener('click', () => {
    itemList.innerHTML = ''; // Clear the list
    shoppingListArr.length = 0; // Clear the shopping list array
    localStorage.removeItem('shoppingList'); // Clear localStorage
});
