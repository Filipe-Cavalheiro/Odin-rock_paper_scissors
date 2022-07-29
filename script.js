function changeScreen(){
    //change background
    const startScreen = document.querySelector(".startScreen");
    startScreen.classList.add("startScreen");
    startScreen.parentNode.removeChild(startScreen);
    const body = document.querySelector("body");
    body.classList.add("body");
    body.style.background = "#f8f4bc";
    
    const matchScreen = document.querySelector(".matchScreen");
    const resume = document.createElement("div");
    resume.classList.add("resume");
    matchScreen.appendChild(resume);

    //add winLose && resultLog
    const winLose = document.createElement("div");
    winLose.classList.add("winLose");
    winLose.innerText = "Wins = 0 | Losses = 0" 
    resume.appendChild(winLose);
    const resultLog = document.createElement("div");
    resultLog.classList.add("resultLog");
    resume.appendChild(resultLog);
    
    const game = document.createElement("div");
    game.classList.add("game");
    matchScreen.appendChild(game);

    //add buttons
    const btnChoices = document.createElement("div");
    btnChoices.classList.add("btnChoices");
    matchScreen.appendChild(btnChoices);
    let choices = ["images/Water_Element_Symbol.webp", "images/Snow_Element_Symbol.webp", "images/Fire_Element_Symbol.webp"]
    for(let i = 1; i < 4; ++i){
        let obj = `btn${i}`;
        obj = document.createElement("button");
        obj.classList.add(`${i}`);
        obj.style = `background: url(${choices[i-1]}) no-repeat`;
        btnChoices.appendChild(obj);
    }
    playGame();
}

function getComputerChoice(){
    //define a number between 1 and 3 this represant rock paper and scissors
    return Math.floor(Math.random()*3)+1;
}

function playGame() {
    const gameBtns = document.querySelectorAll('.btnChoices button');
    gameBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
        playerSelection = parseInt(btn.className)
        computerSelection = getComputerChoice();
        let choices = ["water", "snow", "fire"]

        //create card
        let check = document.querySelector(".playerCard")
        if(check != null)
            check.parentNode.removeChild(check);
        const game = document.querySelector(".game");
        const playerCard = document.createElement("div")
        playerCard.classList.add("playerCard");
        let rand = Math.floor(Math.random()*4)+1;
        playerCard.style.backgroundImage = `url(images/${choices[playerSelection-1]}_card${rand}.webp)`;
        game.appendChild(playerCard);

        check = document.querySelector(".computerCard")
        if(check != null)
            check.parentNode.removeChild(check);
        const computerCard = document.createElement("div")
        computerCard.classList.add("computerCard");
        rand = Math.floor(Math.random()*4)+1;
        computerCard.style.backgroundImage = `url(images/${choices[computerSelection-1]}_card${rand}.webp)`;
        game.appendChild(computerCard);

        //initialize the result string
        const resultLog = document.querySelector(".resultLog");
        const checks = document.querySelectorAll(".resultString");
        if(checks.length >= 5){
            resultLog.removeChild(checks[0])
        }
        const resultString = document.createElement("div"); 
        resultString.classList.add("resultString");
        const winLose = document.querySelector(".winLose");

    
        if(playerSelection == computerSelection){
            resultString.innerText = "Draw";
            resultLog.appendChild(resultString);
            winLose.innerText = `Wins = ${wins} | Losses = ${losses}`;
        }
        //winnig case in which the greater number is allways the winner expect when its 1/3 or 3/1
        else if((((playerSelection > computerSelection) && (playerSelection != 3 || computerSelection != 1)) || (playerSelection == 1 && computerSelection == 3))){
            resultString.innerText = `You Win! ${choices[playerSelection-1]} beats ${choices[computerSelection-1]}`;
            resultString.style.color = "green";
            resultLog.appendChild(resultString);
            ++wins
            winLose.innerText = `Wins = ${wins} | Losses = ${losses}`;
        }
        else{
            resultString.innerText = `You Lose! ${choices[computerSelection-1]} beats ${choices[playerSelection-1]}`;
            resultLog.appendChild(resultString);
            resultString.style.color = "red";
            ++losses
            winLose.innerText = `Wins = ${wins} | Losses = ${losses}`;
        }
        
        if((wins + losses) >= 5){
            finalResult(wins, losses);   
            wins = 0;
            losses = 0;
        }
    });
});
}

function finalResult(wins, losses){
    const game = document.querySelector(".game");
    const gameEndScreen = document.createElement("div"); 
    gameEndScreen.classList.add("gameEndScreen");
    game.appendChild(gameEndScreen);

    const resultText = document.createElement("h5"); 
    (wins > losses)? resultText.innerText = "You Win!" : resultText.innerText = "Better luck next time";
    gameEndScreen.appendChild(resultText);

    const replayBtn = document.createElement("button");
    replayBtn.classList.add("replayBtn");
    replayBtn.innerText = "Replay?";
    gameEndScreen.appendChild(replayBtn);

    replayBtn.addEventListener('click', () => {
        const winLose = document.querySelector(".winLose");
        winLose.innerText = `Wins = 0 | Losses = 0`;
        gameEndScreen.replaceChildren();
        gameEndScreen.parentNode.removeChild(gameEndScreen);

        const game = document.querySelector(".game");
        const playerCard = document.querySelector(".playerCard");
        game.removeChild(playerCard);

        const computerCard = document.querySelector(".computerCard");
        game.removeChild(computerCard);
    });
}

let wins = 0, losses = 0;
const startBtn = document.querySelector("button.startGame")
startBtn.classList.add("startGame");
startBtn.addEventListener('click', () => {changeScreen();});