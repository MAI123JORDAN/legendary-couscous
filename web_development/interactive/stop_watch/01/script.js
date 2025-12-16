let stopwatchInterval;
let startTime;
let elapsedTime = 0;

// Function to format time as HH:MM:SS:MS
function formatTime(time) {
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Function to start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime; // Adjust startTime to account for elapsedTime
    stopwatchInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime; // Calculate elapsed time
        document.getElementById('stopwatch').innerText = formatTime(elapsedTime); // Update display
    }, 10); // Update every 10 milliseconds
}

// Function to stop the stopwatch
function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

// Function to reset the stopwatch
function resetStopwatch() {
    stopStopwatch(); // Stop the timer if it's running
    elapsedTime = 0; // Reset elapsed time
    document.getElementById('stopwatch').innerText = formatTime(elapsedTime); // Update display
}

// Event Listeners for buttons
document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('stopBtn').addEventListener('click', stopStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);