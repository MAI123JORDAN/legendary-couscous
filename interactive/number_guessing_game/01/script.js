let randomNumber = Math.floor(Math.random() * 100) + 1;
let chances = 10;

document.getElementById('check-btn').addEventListener('click', function() {
    const userGuess = Number(document.getElementById('guess-input').value);
    let resultText = '';

    if (chances > 0) {
        if (userGuess === randomNumber) {
            resultText = 'Congratulations! You guessed the correct number!';
        } else if (userGuess < randomNumber) {
            chances--;
            resultText = 'Too low! Try again.';
        } else if (userGuess > randomNumber) {
            chances--;
            resultText = 'Too high! Try again.';
        }
    } else {
        resultText = `Game over! The correct number was ${randomNumber}.`;
    }

    document.getElementById('result').innerText = resultText;
    document.getElementById('chances').innerText = `You have ${chances} chances left.`;
    
    if (chances === 0) {
        document.getElementById('guess-input').disabled = true; // Disable input after game over
        document.getElementById('check-btn').disabled = true; // Disable button after game over
    }
});