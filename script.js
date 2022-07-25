function getComputerChoice(){
    //define a number between 1 and 3 this represant rock paper and scissors
    return Math.floor(Math.random()*3)+1;
}

function playRound(playerSelection, computerSelection) {
    let choices = ["rock", "paper", "scissors"] // the array is for printing with ease the choices

    //initialize the classes to be modified
    const checks = document.querySelectorAll(".resultString");
    if(checks != null){
        checks.forEach(check => {
            check.remove(); //remove string from prev game if it exits
        });
    }
    const resultString = document.createElement("div"); 
    resultString.classList.add("resultString");
    const winLose = document.querySelector(".winLose");

 
    if(playerSelection == computerSelection){
        resultString.innerText = "Draw";
        document.body.appendChild(resultString);
        winLose.innerText = `wins = ${wins} | Losses = ${losses}`;
        return 0;
    }
    //winnig case in which the greater number is allways the winner expect when its 1/3 or 3/1
    else if((((playerSelection > computerSelection) && (playerSelection != 3 || computerSelection != 1)) || (playerSelection == 1 && computerSelection == 3))){
        resultString.innerText = `You Win! ${choices[playerSelection-1]} beats ${choices[computerSelection-1]}`;
        document.body.appendChild(resultString);
        ++wins
        winLose.innerText = `wins = ${wins} | Losses = ${losses}`;
        return;
    }
    else{
        resultString.innerText = `You Lose! ${choices[computerSelection-1]} beats ${choices[playerSelection-1]}`;
        document.body.appendChild(resultString);
        ++losses
        winLose.innerText = `wins = ${wins} | Losses = ${losses}`;
        return ;
    }
}

function finalResult(wins, losses){
    const resultString = document.createElement("div"); 
    resultString.classList.add("resultString");
    (wins >= losses)? resultString.innerText = "You Win!" : resultString.innerText = "Better luck next time";
    document.body.appendChild(resultString);
}

let wins = 0, losses = 0;
const btns = document.querySelectorAll('button');
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        playRound(parseInt(btn.className), getComputerChoice())
        if((wins + losses) >= 5){
            finalResult(wins, losses);   
            wins = 0;
            losses = 0;
        }
    });
});