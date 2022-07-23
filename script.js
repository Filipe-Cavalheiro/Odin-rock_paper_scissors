function getComputerChoice(){
    //define a number between 1 and 3 this represant rock paper and scissors
    return Math.floor(Math.random()*3)+1;
}

function playRound(playerSelection, computerSelection) {
    // the array is for printing with ease the choices
    let choices = ["rock", "paper", "scissors"]
    //make the layer choice allways lower case for a more defensive code in case of a incorrect awnser the player will all ways lose
    playerSelection = playerSelection.toLowerCase()
    switch(playerSelection){
        case "rock": playerSelection = 1; break;
        case "paper": playerSelection = 2; break;
        case "scissors": playerSelection = 3; break;
        default: playerSelection = 0;
    }
    //draw case
    if(playerSelection == computerSelection){
        console.log("Draw");
        return 0;
    }
    //winnig case in which the greater number is allways the winner expect when its 1/3
    else if(((playerSelection > computerSelection) || (playerSelection == 1 && computerSelection == 3))){
        if(playerSelection == 3 && computerSelection == 1){
            console.log(`You Lose! ${choices[computerSelection-1]} beats ${choices[playerSelection-1]}`);
            return 2;
        }
        console.log(`You Win! ${choices[playerSelection-1]} beats ${choices[computerSelection-1]}`);
        return 1;
    }
    //losing case is all the other that haven't happend yet
    else{
        console.log(`You Lose! ${choices[computerSelection-1]} beats ${choices[playerSelection-1]}`);
        return 2;
    }
}

function game(){
    //number of wins of the cpu and user
    let userWins = 0;
    let ComputerWins = 0;
    //i is the game that is currently being played and there are a total of 5 games
    for (let i = 0; i < 5; i++) {
        let winner;
        winner = playRound(prompt("your choice"), getComputerChoice());
        if(winner == 1)
            ++userWins;
        else if(winner == 2)
            ++ComputerWins
    }
    //the last decision of who wins (the one with most points in case of draw all games user wins)
    userWins>=ComputerWins? console.log("YOU WIN") : console.log("Try Again");
}

game()