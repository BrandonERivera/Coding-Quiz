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
var questions = ["abcdef", "ghijk", "lmnop"];
var questionWrong;
timecount = 60;

var questions = [{
    question: "This is my first question",
    choices: ["Boolean","Numbers","Alerts","Strings"],
    answer: "Alerts"
}, {question: "This is my second Question",
    choices: ["Boolean","Numbers","Alerts","Strings"],
    answer: "Strings"
}]

index = 0;

//begin
// display question
questions[index].question
// loop through all choices and display on screen
questions[index].choices
// compare user choice with questions[index].answer
// tell user if right or wrong
// if wrong subtract time from timer.
// increment index & clear dom (questions and answers)
// if all questions anwered or time is up end game
// if not goto begin

startButton.addEventListener("click", startGame);
function startGame(){
    startButton.style.display = "none";
    pointsEL.textContent = "Score: " + points;
    startTimer();
    Nextquestion();
}
function Nextquestion(){
    console.log(questions[index].answer);
    QuestionEl.textContent = questions[index].question
    for (var i = 0; i < questions[index].choices.length; i++){
        ButtonEl[i].textContent = questions[index].choices[i];
    }
    for (var i = 0; i < questions[index].choices.length; i++){  
        ButtonEl[i].addEventListener("click", checkanswer);
    }
}
function checkanswer(event){
    console.log(this.textContent)
    if(this.textContent == questions[index].answer)
    {
        displayEL.textContent = "Right"
        addpoints();
    }
    else
    {
        displayEL.textContent = "Wrong"
        questionWrong = true;
    }

    index++

    if(index < questions.length)
    {
        Nextquestion();
    }
    else{
        isfinished = true;
    }


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
        if (timecount <= 0 || isfinished == true){
            timecount = 0;
            timerElement.textContent = timecount;
            clearInterval(timer);          
        }
    }, 1000);
}
function addpoints()
{
        points = points + 100;
        pointsEL.textContent = "Score: " + points;

}
function Beginquestion(){
    DisplayQuestion()
    DisplayAnswers()

    for (var i = 0; i < answers.answers1.length; i++){  
        ButtonEl[i].addEventListener("click", checkanswer);
    }
}
