var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var QuestionEl = document.querySelector(".questions");
var displayEL = document.querySelector(".displaymessage");
var pointsEL = document.querySelector(".points");
var answers = document.querySelector(".Answers");
var questiontitle = document.querySelector(".questiontitle");
var gameContainer = document.querySelector(".game-container");
var scoreform = document.querySelector(".Scoreform");
var userEL = document.querySelector(".username");
var scoreEL = document.querySelector(".score");
var SavingEL = document.querySelector(".saving-score");
var leaderboardbtn = document.querySelector(".leader-boardbtn");
var leadboardEL = document.querySelector(".leader-board")
var exitLeaderboardEL = document.querySelector(".exit-leaderboard");
var startarea = document.querySelector(".starterbuttons")


var points = 0;
var timer;
var isfinished = false;
var timecount;
var questionWrong;
var timecount = 60;

var questions = [{
    question: "Commonly used DATA Types do not include?",
    choices: ["Boolean","Numbers","Alerts","Strings"],
    answer: "Alerts"
}, {question: "In an if statment which symbol represents OR?",
    choices: ["||","&&","=="],
    answer: "||"
}, { question: "which can be used for commenting in Javascript?",
    choices: ["//","/*  */","A & B","None of the Above"],
    answer: "A & B"

}];


index = 0;

startButton.addEventListener("click", startGame);

SavingEL.addEventListener("click", function(){
    if(userEL.value !== ""){
        savescore()
    }
})
leaderboardbtn.addEventListener("click", displayLeaderboard);
exitLeaderboardEL.addEventListener("click",reset);

function displayLeaderboard(){
    startarea.style.display = "none";
    leadboardEL.innerHTML = "";
    exitLeaderboardEL.style.display = "block";
    leadboardEL.style.display = "block";
    var savedscores = JSON.parse(localStorage.getItem("savedscores"))
    for(var i = 0; i < savedscores.length; i++){
        var leaderbordcontainer = document.createElement("div");
        var namecontainer = document.createElement("div");
        var scorecontainer = document.createElement("div");
        var nameEL = document.createElement("p");
        var scoreEL = document.createElement("p");
        nameEL.style.width = "400px";
        scoreEL.style.width = "100px";
        nameEL.textContent = `Name: ${savedscores[i].name}`;
        scoreEL.textContent = `Score: ${savedscores[i].score}`;
        namecontainer.append(nameEL);
        scorecontainer.append(scoreEL);
        leaderbordcontainer.append(namecontainer,scorecontainer);
        leaderbordcontainer.style.display = "flex";
        leadboardEL.append(leaderbordcontainer);
    }

}
function startGame(){
    isfinished = false;
    startarea.style.display = "none";
    gameContainer.style.display = "block";

    pointsEL.textContent = "Score: " + points;
    startTimer();
    Nextquestion();
}
function Nextquestion(){
    questiontitle.textContent = "Question: " + (index+1);
    answers.innerHTML = "";
    QuestionEl.textContent = questions[index].question
    for (var i = 0; i < questions[index].choices.length; i++){
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = questions[index].choices[i]
        li.appendChild(button);
        answers.appendChild(li);
        button.addEventListener("click", checkanswer);
    } 
}
function checkanswer(){
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
    index++;

    if(index < questions.length)
    {
        Nextquestion();
    }
    else{
        isfinished = true;
        endgame();

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
        timerElement.textContent = "Seconds Remain: " + timecount;
        if (timecount <= 0 || isfinished == true){
            timerElement.textContent = "Done";
            clearInterval(timer); 
            endgame()         
        }
    }, 1000);
}
function addpoints()
{
        points = points + 100;
        pointsEL.textContent = "Score: " + points;

}
function endgame(){
    scoreform.style.display = "flex";
    scoreEL.textContent = "final score: " + points;
    gameContainer.style.display = "none";
}
function savescore(){
    var savedscores = JSON.parse(localStorage.getItem("savedscores")) || []
    var userscore = {
        name: userEL.value,
        score: points
    }
    savedscores.push(userscore)
    localStorage.setItem("savedscores", JSON.stringify(savedscores))
    userEL.value = "";
    reset()
}
function reset(){
    scoreform.style.display = "none";
    startarea.style.display = "flex";
    leadboardEL.style.display = "none";
    exitLeaderboardEL.style.display = "none";
    index = 0;
    score = 0;
}
