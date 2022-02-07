


// array of questions used in quiz with answers
 const questions = [
    {
        question: "What year did Freddie Freeman win MVP of the National League?",
        choices: ["a. 2019", "b. 2020", "c. 2012", "d. 2021"],
        answer: "b. 2020"
    },
    {
        question: "Who is the Braves' all-time home run leader?",
        choices: ["a. Andruw Jones", "b. Eddie Matthews", "c. Chipper Jones", "d. Hank Aaron"],
        answer: "d. Hank Aaron"
    },
    {
        question: "How many consecutive years did the Braves win the NL East division?",
        choices: ["a. 12", "b. 14", "c. 10", "d. 5"],
        answer: "b. 14"
    },
    {
        question: "Where did the Braves franchise begin?",
        choices: ["a. Atlanta", "b. Milwaukee", "c. Boston", "d. none of the above"],
        answer: "c. Boston"
    },
    {
        question: "What was the name of the Braves mascot at Fulton County Stadium?",
        choices: ["a. Choppy", "b. Chief Knockahoma", "c. Ted Jones", "d. Blooper"],
        answer: "b. Chief Knockahoma"
    },
    {
        question: "Who is the Braves' most recent Rookie of the Year?",
        choices: ["a. Mike Soroka", "b. Freddie Freeman", "c. Ronald Acuña Jr.", "d. Jason Heyward"],
        answer: "c. Ronald Acuña Jr."
    },
    {
        question: "What division do the Braves play in?",
        choices: ["a. AL East", "b. NL East", "c. NL South", "d. AL South"],
        answer: "b. NL East"
    },
    {
        question: "Who won the World Series MVP with the Braves in 2021?",
        choices: ["a. Jorge Soler", "b. Dansby Swanson", "c. Guy Fieri", "d. Brian Snitker"],
        answer: "a. Jorge Soler"
    },
    {
        question: "What year are the Braves famous for winning the Pennant after finishing last the year before?",
        choices: ["a. 1969", "b. 1998", "c. 1992", "d. 1994"],
        answer: "c. 1992"
    },
    {
        question: "What color uniforms do the Braves wear on Friday home games? ",
        choices: ["a. Grey", "b. White", "c. Red", "d. Navy"],
        answer: "c. Red"
    },
    {
        question: "Who holds the Braves' single season Saves record?",
        choices: ["a. Julio Teheran", "b. Luke Jackson", "c. Craig Kimbrel ", "d. John Smoltz"],
        answer: "d. John Smoltz"
    },
    {
        question: "Who holds the Braves' single season Runs record?",
        choices: ["a. Chipper Jones", "b. Andruw Jones", "c. Ted Jones", "d. none of the above"],
        answer: "a. Chipper Jones"
    }
];

// references to elements used in index.html
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;



// WHEN I click the start button, then a timer starts..
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    start.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

// this presents me with another question
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// when the question is answered, show if I was correct or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct answer adds 5 points to final score
        correctAns++;
        // console.log(correctAns);
        answerCheck.textContent = "Correct!";
    } else {
        // wrong answer, deducts 12 seconds from the timer
        totalTime -= 12;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // repeat
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if there are no more questions
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

// when all questions are answered or timer reaches 0, game over
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // show final score
    finalScore.textContent = correctAns;
}

// enter initial and store high score in local storage
function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // stores the score into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

// /* ALL EVENT LISTENERS FOR BUTTONS */

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});