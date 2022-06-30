const welcomeEl = document.querySelector("#welcome");
const startQuizBtnEl = document.querySelector("#startQuiz");

const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");

const inputScoreEl = document.querySelector("#inputScore");
const namesEl = document.querySelector("#names");
const submitNamesBtnEl = document.querySelector("#submitNames");
const userScoreEl = document.querySelector("#score");

const highScoresEl = document.querySelector("#highScores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#goBack");
const clearScoresBtnEl = document.querySelector("#clearScores");

const viewHScoresBtnEl = document.querySelector("#viewHScores");
const timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 60;
var secondsElapsed = 0;
//QUIZ QUESTIONS AND ANSWERS
var questions = [
    {
        title: "Primative data types DO NOT include:",
        choices: ["strings", "booleans", "arrays", "null"],
        answer: "arrays"
    },

    {
        title: "What does DOM stand for?",
        choices: ["Document Object Model", "Document Overlay Model", "Documentation On Models", "Deadline On Monday"],
        answer: "Document Object Model"
    },

    {
        title: "Which built-in method removes the last element from an array and returns that element?",
        choices: ["last()", "pop()", "get()", "charAt()"],
        answer: "pop()"
    },

    {
        title: "Which of the following function of Array object joins all elements of an array into a string?",
        choices: ["concat()", "join()", "pop()", "return()"],
        answer: "join()"
    }
];

//TIMER FUNCTIONS
function startTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

//QUESTIONS/ANSWER CHECK FUNCTIONS
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        displayMessage("Correct! :)");
    }
    else {
        secondsElapsed += 5;
        displayMessage("Incorrect! :(");
    }
}

//CORRECT/INCORRECT FUNCTION
function displayMessage(answer) {
    let messageEl = document.createElement("h2");
    messageEl.textContent = answer;
    document.querySelector(".jumbotron").appendChild(messageEl);
    setTimeout(function () {
            messageEl.remove();
    }, 750);

}

//ELEMENT CHANGE FUNCTIONS
function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

//RENDER FUNCTIONS TO SCREEN
function renderQuestion() {
    questionEl.textContent = questions[currentQ].title;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

function renderHighScores() {
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);
    }
}

//EVENT LISTENERS
viewHScoresBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

startQuizBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

answersEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        checkAnswer(event.target);
        nextQuestion();
    }
});

submitNamesBtnEl.addEventListener("click", function () {
    let initValue = namesEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        namesEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScoreEl);
        renderHighScores();
        reset();
    }
});

goBackBtnEl.addEventListener("click", function () {
    hide(highScoresEl);
    show(welcomeEl);
});

clearScoresBtnEl.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
});





