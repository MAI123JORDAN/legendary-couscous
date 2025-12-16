const quotes = [
    {
        text: "Never give up because you never know if the next try is going to be the one that works.",
        author: "Mary Kay Ash"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Life is 10% what happens to us and 90% how we react to it.",
        author: "Charles R. Swindoll"
    },
    {
        text: "Your time is limited, so don’t waste it living someone else’s life.",
        author: "Steve Jobs"
    }
];

// Function to generate a random quote
function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    document.getElementById('quote').innerText = `"${selectedQuote.text}"`;
    document.getElementById('author').innerText = `- ${selectedQuote.author}`;
}

// Event listener for button
document.getElementById('newQuoteBtn').addEventListener('click', generateRandomQuote);

// Generate a quote on page load
generateRandomQuote();