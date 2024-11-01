function Gameboard() {

    const cells = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    return cells
}

winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWin(gameboard, player) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameboard[a] != " " && gameboard[a] == gameboard[b] && gameboard[a] == gameboard[c]) {
            return player.name;
        }
    }
    return "none";
}

function checkDraw(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] == " ") {
            return false;
        }
    }
    return true;
}   

function Player(x) {
    let name = prompt("Please enter your name");
    let symbol = selectSymbol(x);

    return {name, symbol}
}

function selectSymbol(x) {
    if (x) {
        if (x.symbol == "x") {
            return "o";
        }   else {
            console.log(x.symbol);
            return "x";
        }
    }   else {
        symbol = prompt("Please enter your symbol");
        while (symbol != "x" && symbol != "o") {
            symbol = prompt("Please enter your symbol");
        }
        return symbol;
    }
}

function Display(gameboard) {
    console.log('|' + gameboard[0] + '|' + gameboard[1] + '|' + gameboard[2] + '|\n|' + gameboard[3] + '|' + gameboard[4] + '|' + gameboard[5] + '|\n|' + gameboard[6] + '|' + gameboard[7] + '|' + gameboard[8] + '|');
}

function playerMove(gameboard, player) {
    let move = prompt("Please enter your move from 1 to 9");
    if (gameboard[move - 1] !== " ") {
        console.log("Please enter a valid move");        
        return playerMove(gameboard, player);
    }   else {
        gameboard[move - 1] = player.symbol;
        return gameboard;     
    }   
}

function switchPlayer(currentPlayer, player1, player2) {
    if (currentPlayer.name == player1.name) {
        console.log(currentPlayer)
        return player2;
    }   else {
        return player1;
    }
}   

function Game() {
    /*Control the game flow*/
    const gameboard = Gameboard();
    const player1 = Player();
    const player2 = Player(player1);
    let currentPlayer = player1;

    console.log(player1.name, player1.symbol, player2.name, player2.symbol);

    Display(gameboard);

    let winner = "none";

    while (winner == "none") {

        playerMove(gameboard, currentPlayer);
        winner = checkWin(gameboard, player1);

        if (winner != "none") {
            Display(gameboard);
            console.log(winner, "wins");
            break;
        }

        if (checkDraw(gameboard)) {
            Display(gameboard);
            console.log("Draw");
            break;
        }

        console.log(currentPlayer, currentPlayer.symbol, currentPlayer.name);

        currentPlayer = switchPlayer(currentPlayer, player1, player2);

        Display(gameboard);
        
    }

}