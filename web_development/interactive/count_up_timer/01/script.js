let timerInterval;
let count = 0;

// Function to start the timer
function startTimer() {
    if (!timerInterval) { // Prevent multiple intervals
        timerInterval = setInterval(() => {
            count++;
            document.getElementById('timer').innerText = count;
        }, 1000);
    }
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null; // Reset the timer interval
}

// Function to reset the timer
function resetTimer() {
    stopTimer(); // Stop the timer if it's running
    count = 0; // Reset count
    document.getElementById('timer').innerText = count; // Update display
}

// Event Listeners for buttons
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);