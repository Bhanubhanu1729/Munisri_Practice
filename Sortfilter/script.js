// script.js

let data = JSON.parse(localStorage.getItem('tableData')) || []; // Load data from localStorage
let editIndex = -1;  // To track if we are in edit mode

// DOM Elements
const dataForm = document.getElementById('dataForm');
const itemID = document.getElementById('itemID');
const itemName = document.getElementById('itemName');
const itemAge = document.getElementById('itemAge');
const itemCity = document.getElementById('itemCity');
const tableBody = document.getElementById('tableBody');
const addEditButton = document.getElementById('addEditButton');

// Filters
const filterID = document.getElementById('filterID');
const filterName = document.getElementById('filterName');
const filterAge = document.getElementById('filterAge');
const filterCity = document.getElementById('filterCity');

// Event listeners
dataForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (editIndex === -1) {
        addItem();
    } else {
        updateItem();
    }
});

// Function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('tableData', JSON.stringify(data));
}

// Function to add a new item
function addItem() {
    const newItem = {
        id: itemID.value,
        name: itemName.value,
        age: itemAge.value,
        city: itemCity.value
    };
    data.push(newItem);
    saveToLocalStorage();
    displayData(data);
    resetForm();
}

// Function to display data in the table
function displayData(dataArray) {
    tableBody.innerHTML = '';  // Clear existing table data
    dataArray.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.city}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit an existing item
function editItem(index) {
    editIndex = index;
    const item = data[index];
    itemID.value = item.id;
    itemName.value = item.name;
    itemAge.value = item.age;
    itemCity.value = item.city;
    addEditButton.textContent = 'Update Item';
}

// Function to update an item
function updateItem() {
    const updatedItem = {
        id: itemID.value,
        name: itemName.value,
        age: itemAge.value,
        city: itemCity.value
    };
    data[editIndex] = updatedItem;
    saveToLocalStorage();
    displayData(data);
    resetForm();
}

// Function to delete an item
function deleteItem(index) {
    data.splice(index, 1);
    saveToLocalStorage();
    displayData(data);
}

// Function to reset the form
function resetForm() {
    dataForm.reset();
    editIndex = -1;
    addEditButton.textContent = 'Add Item';
}

// Sorting functionality for each column
document.getElementById('idHeader').addEventListener('click', () => sortData('id'));
document.getElementById('nameHeader').addEventListener('click', () => sortData('name'));
document.getElementById('ageHeader').addEventListener('click', () => sortData('age'));
document.getElementById('cityHeader').addEventListener('click', () => sortData('city'));

// Sort data function
let sortDirection = 1;  // 1 for ascending, -1 for descending

function sortData(field) {
    data.sort((a, b) => {
        if (a[field] > b[field]) return sortDirection;
        if (a[field] < b[field]) return -sortDirection;
        return 0;
    });
    sortDirection *= -1;  // Toggle sort direction for next click
    saveToLocalStorage();
    displayData(data);
}

// Filter events for each filter input
filterID.addEventListener('input', filterData);
filterName.addEventListener('input', filterData);
filterAge.addEventListener('input', filterData);
filterCity.addEventListener('input', filterData);

// Filter function for all fields
function filterData() {
    const filteredData = data.filter(item =>
        item.id.includes(filterID.value) &&
        item.name.toLowerCase().includes(filterName.value.toLowerCase()) &&
        item.age.toString().includes(filterAge.value) &&
        item.city.toLowerCase().includes(filterCity.value.toLowerCase())
    );
    displayData(filteredData);
}

// Initial display of data from localStorage
displayData(data);
