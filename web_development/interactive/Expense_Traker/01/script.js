// 1. Select DOM elements
const balance = document.getElementById('total-balance');
const money_plus = document.getElementById('income-display');
const money_minus = document.getElementById('expense-display');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 1. Updated State: Pull from localStorage OR start with empty array
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

// 2. State: This array will hold all our transaction objects
let transactions = localStorage.getItem('transactions') !== null 
    ? localStorageTransactions 
    : [];

// 3. Add transaction function
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a description and an amount');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value // The + converts the string to a number
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    // SAVE TO STORAGE
    updateLocalStorage();

    // Clear inputs
    text.value = '';
    amount.value = '';
}

// Generate random ID for each transaction
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// 4. Add transactions to the list (DOM)
function addTransactionDOM(transaction) {
    // Determine if it's income or expense based on the sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus-border' : 'plus-border');

    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// 5. Update the total balance, income, and expense totals
function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

// 6. Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);

    // UPDATE STORAGE AFTER DELETE
    updateLocalStorage();

    init(); // Re-render everything
}

// 2. Updated Update function: Save to localStorage every time data changes
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener('submit', addTransaction);

// Ensure init() is called at the very end
init();

const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all transactions?')) {
        transactions = [];
        updateLocalStorage();
        init();
    }
});