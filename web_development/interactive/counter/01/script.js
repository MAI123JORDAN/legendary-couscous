// Initial counter value
let counter = 0;

// Select the counter display element
const counterDisplay = document.querySelector('#counterDisplay');

// Select buttons
const incrementButton = document.querySelector('#incrementButton');
const decrementButton = document.querySelector('#decrementButton');
const resetButton = document.querySelector('#resetButton'); // New reset button

// Function to update the display
function updateDisplay() {
    counterDisplay.innerText = counter; // Update the displayed counter value
}

// Event listeners for buttons
incrementButton.addEventListener('click', () => {
    counter++; // Increment the counter
    updateDisplay(); // Update the display
});

decrementButton.addEventListener('click', () => {
    counter--; // Decrement the counter
    updateDisplay(); // Update the display
});

resetButton.addEventListener('click', () => {
    counter = 0; // Reset the counter
    updateDisplay(); // Update the display
});

// Initial display update
updateDisplay();