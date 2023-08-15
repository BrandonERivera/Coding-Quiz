var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var QuestionEl = document.querySelector(".questions");
var ButtonEl = document.querySelectorAll(".button");
var displayEL = document.querySelector(".displaymessage");
var pointsEL = document.querySelector(".points")

var points = 0;
var timer;
var isfinished = false;
var timecount;
var questionnum;
var questions = {
    question1: "abcdef",
    question2: "ghijk",
    question3: "lmnop",
};
var questionWrong;

var answers= {
    answers1: ["Boolean","Numbers","Alerts","Strings"],
    answers2: ["1","2","3","4"],
    answers3: ["5","6","7","8"]
};
timecount = 60;

function startGame(){
    startButton.style.display = "none";
    pointsEL.textContent = "Score: " + points;
    startTimer();
    Beginquestion();
}
function startTimer(){
    timer = setInterval(function() {
        timecount --;
        if (questionWrong === true)
        {
            timecount = timecount -5;
            questionWrong = false;

        }
        timerElement.textContent = timecount;
        if (timecount <= 0){
            timecount = 0;
            timerElement.textContent = timecount;
            clearInterval(timer);          
        }
    }, 1000);
}

function DisplayQuestion(){
    QuestionEl.textContent = questions.question1;
    questionnum++;
}
function DisplayAnswers(){
    for (var i = 0; i < answers.answers1.length; i++){
        ButtonEl[i].textContent = answers.answers1[i];
    }
}
function checkanswer(event){
    if(this.textContent == "Alerts")
    {
        displayEL.textContent = "Right"
        questionWrong = false;
        addpoints()

    }
    else
    {
        displayEL.textContent = "Wrong"
        questionWrong = true;
    }
}
function addpoints()
{
    if(questionWrong === false)
    {
        points = points + 100;
        console.log(points);
        pointsEL.textContent = "Score: " + points;
        questionWrong = 0;
    }
}
function Beginquestion(){
    DisplayQuestion()
    DisplayAnswers()
    for (var i = 0; i < answers.answers1.length; i++){  
        ButtonEl[i].addEventListener("click", checkanswer);
    }




}
startButton.addEventListener("click", startGame);
