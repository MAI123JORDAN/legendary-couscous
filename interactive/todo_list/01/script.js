// Select input fields and buttons
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// Function to create a new to-do item
function createTodoItem(text) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    
    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>
    `;

    // Event listener for edit button
    li.querySelector('.edit-button').addEventListener('click', () => {
        const newText = prompt('Edit your task:', text);
        if (newText) {
            li.querySelector('span').innerText = newText;
        }
    });

    // Event listener for delete button
    li.querySelector('.delete-button').addEventListener('click', () => {
        todoList.removeChild(li);
    });
    
    return li;
}

// Event listener for add button
addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
        todoInput.value = ''; // Clear input field
    }
});