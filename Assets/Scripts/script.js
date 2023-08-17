// querySelector variables to grab componenets from the html 
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

// variables used throughout the javascript
var points = 0;
var timer;
var isfinished = false;
var timecount;
var questionWrong;
var timecount = 60;

//this array holds objects for the questions, with their question, choices, and what the correct answer is"
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
/*the start button and leaderboard button are the only buttons the user can see on the start screen,
the start button will start the game while the leaderboardbtn will display the leaderboard*/

startButton.addEventListener("click", startGame);
leaderboardbtn.addEventListener("click", displayLeaderboard);

// this button is only visable during the endgame function and will save the score and name to a local storage
SavingEL.addEventListener("click", function(){
    if(userEL.value !== ""){
        savescore()
    }
})
exitLeaderboardEL.addEventListener("click",reset);

/*display leaderboard function shows the leaderboard and the exit leaderboard button, hides the startarea and emptys out the leaderboard to then fill it back in 
it creates the variable of savedscores and grabs the local storage, it gets the name and score and puts them in their own div and displays them in the leaderboard
*/
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
/* startgame function hides the start area makes sure the game isnt finised and shows the game container, as well as sets the points and starts
the timer function and the next question function */
function startGame(){
    isfinished = false;
    startarea.style.display = "none";
    gameContainer.style.display = "block";

    pointsEL.textContent = "Score: " + points;
    startTimer();
    Nextquestion();
}
/* next question for loops through the questions to display the question and choices 
it then gives these buttons a eventlistener to run the check answer function */
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
/* checkanswer function checks if whats written on the button is the same as the answer its looking for in the questions object if it is
it displayed right and add points if not it displays wrong and changes question wrong to true
after that is increases index and moves to the next question unless theres no more questions which it will call endgame instead */
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
/* start timer starts when the startbutton is clicked, every second it shows the timer which decreases by 1 every second
if there is a questionwrong it will subtract 5 seconds then flip questionwrong back to false to not continuesly do it
if timer is ever 0 or lower or if the game is finished it runs endgame */
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
// addpoints function adds points to points the updates points display
function addpoints()
{
        points = points + 100;
        pointsEL.textContent = "Score: " + points;

}
// end game shows the scoreform to input your name and score, this is where the savingel button is and shows your final score which is your points
function endgame(){
    scoreform.style.display = "flex";
    scoreEL.textContent = "Final score: " + points;
    gameContainer.style.display = "none";
}
//savescore from pressing the savingel will create the object of userscore strigy it and add it to the local storage it then emptys the name and runs resets 
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
//reset hides and shows everything back to the start and leaderboard button and hides everything else and resets the score and index to loop again
function reset(){
    scoreform.style.display = "none";
    startarea.style.display = "flex";
    leadboardEL.style.display = "none";
    exitLeaderboardEL.style.display = "none";
    index = 0;
    score = 0;
}
