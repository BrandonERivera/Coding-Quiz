var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var QuestionEl = document.querySelector(".questions");
var ButtonEl = document.querySelectorAll(".button");

var timer;
var isfinished = false;
var timecount;

var questions = {
    question1: "abcdef",
    question2: "ghijk",
    question3: "lmnop",
    question4: "qrstu",
    question5: "vwxyz"
};

var answers= {
    answers1: ["Boolean","Numbers","Alerts","Strings"],
};
timecount = 60;

function startGame(){
    startButton.style.display = "none";
    startTimer();
    Beginquestion();
}
function startTimer(){
    timer = setInterval(function() {
        timecount --;
        timerElement.textContent = timecount;
        if (timecount === 0){
            clearInterval(timer);
        }
    }, 1000);
}

function DisplayQuestion(){
    QuestionEl.textContent = questions.question1;
}
function DisplayAnswers(){
    for (var i = 0; i < answers.answers1.length; i++){
        ButtonEl[i].textContent = answers.answers1[i];
    }
}
function checkanswer(event){
    

}
function Beginquestion(){
    DisplayQuestion()
    DisplayAnswers()
    ButtonEl.addEventListener("click", checkanswer)




}
startButton.addEventListener("click", startGame);
