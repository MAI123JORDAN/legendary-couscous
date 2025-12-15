function displayGreeting() {
    const greetingMessage = document.getElementById('greetingMessage');
    const card = document.getElementById('card');
    const currentHour = new Date().getHours();

    let greeting;
    let bgColor;
    let cardColor;

    if (currentHour >= 5 && currentHour < 11) {
        greeting = "Good Morning!";
        bgColor = "#FFFAE3"; // Light yellow
        cardColor = "#FFEAAE"; // Light yellow card
    } else if (currentHour >= 11 && currentHour < 17) {
        greeting = "Good Afternoon!";
        bgColor = "#E0F7FA"; // Light blue
        cardColor = "#B2EBF2"; // Light blue card
    } else if (currentHour >= 17 && currentHour < 21) {
        greeting = "Good Evening!";
        bgColor = "#FFEDD5"; // Light orange
        cardColor = "#FFE0B2"; // Light orange card
    } else {
        greeting = "Good Night!";
        bgColor = "#1E1E78"; // Dark blue
        cardColor = "#0D47A1"; // Dark blue card
    }

    greetingMessage.innerText = greeting;
    document.body.style.backgroundColor = bgColor;
    card.style.backgroundColor = cardColor;
}

// Call the function to display the greeting when the page loads
displayGreeting();

// Set an interval to update the greeting every minute (60000 ms)
setInterval(displayGreeting, 60000);