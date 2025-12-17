// The Quiz Data: An array of objects
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ],
        correct: 1 // Index of "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "content",
            "font-weight",
            "color",
            "background-color"
        ],
        correct: 2
    },
    {
        question: "Which JavaScript keyword is used to declare a variable that cannot be reassigned?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        correct: 2
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = (1:'red', 2:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 1 = ('red'), 2 = ('blue')",
            "var colors = 'red', 'green', 'blue'"
        ],
        correct: 1
    },
    {
        question: "Which HTML element is used to put the JavaScript code?",
        options: [
            "<javascript>",
            "<js>",
            "<scripting>",
            "<script>"
        ],
        correct: 3
    }
];

// 1. Select DOM Elements
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionText = document.getElementById('question-text');
const optionList = document.getElementById('option-list');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score-text');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// 2. Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;

// 3. Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    homeScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    
    // Update progress and question text
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    questionText.innerText = currentQuestion.question;

    // Generate option buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionList.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    while (optionList.firstChild) {
        optionList.removeChild(optionList.firstChild);
    }
}

function selectAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    
    // 1. Check if the answer is correct
    if (selectedIndex === correctIndex) {
        score++;
        // Optional: you could add a 'correct' class here for styling
    }

    // 2. Disable all buttons so the user can't change their mind
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    // 3. Show the "Next" button
    nextBtn.classList.remove('hidden');
}

function handleNextButton() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}


// 4. Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextButton);
restartBtn.addEventListener('click', startQuiz);