const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-item');
const markItems = document.getElementById('mark-purchased');

addButton.addEventListener('click', () => {
    if (itemInput.value.trim() === '') return; // Prevent adding empty items

    const newItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Toggle class on checkbox change
    checkbox.addEventListener('change', () => {
        newItem.classList.toggle('purchased', checkbox.checked);
    });

    newItem.appendChild(checkbox);
    newItem.appendChild(document.createTextNode(itemInput.value));
    itemList.appendChild(newItem);
    itemInput.value = ''; // Clear the input
});

markItems.addEventListener('click', () => {
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = true; // Mark checkbox as checked
            item.classList.add('purchased'); // Add purchased class
        }
    });
});

clearButton.addEventListener('click', () => {
    itemList.innerHTML = ''; // Clear the list
});