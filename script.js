function Gameboard() {

    const cells = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    return cells
}

function DisplayGameboard(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
        console.log(gameboard[i]);
        document.getElementById(i).innerHTML = gameboard[i];
    }
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
            console.log("nodrAW")
            return false;
        }
    }
    console.log("draw")
    return true;
}   

function Player(n, s) {
    let name = n;
    let symbol = s;

    return {name, symbol}
}

function submit1() {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    const symbol = document.getElementById("symbol").value;
    if (player1 == "" || player2 == "" || symbol == "") {
        alert("Please enter both names and select a symbol");
        return;
    }
    else {
        clear();
        return Game(player1, player2, symbol);
    }
}

function selectSymbol(x) {
    if (x == "X") {
        return "O";
    }   else {
        return "X";
    }
}

function Display(gameboard) {
    console.log('|' + gameboard[0] + '|' + gameboard[1] + '|' + gameboard[2] + '|\n|' + gameboard[3] + '|' + gameboard[4] + '|' + gameboard[5] + '|\n|' + gameboard[6] + '|' + gameboard[7] + '|' + gameboard[8] + '|');
}

function playerMove(boxId, currentPlayer, gameboard) {
    let move = boxId;
        gameboard[move] = currentPlayer.symbol;
        DisplayGameboard(gameboard);
        return gameboard;      
}

function switchPlayer(currentPlayer, player1, player2) {
    if (currentPlayer.name == player1.name) {
        console.log(currentPlayer)
        return player2;
    }   else {
        return player1;
    }
}   

function clear() {
    document.getElementById("playerCreation").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    console.log("clear");
}

function blockBox() {
    for (let i = 0; i < 9; i++) {
        var boxes = document.querySelectorAll('.grid-item')
            boxes.forEach(function(box) {
                    document.getElementById(i).style.pointerEvents="none"
    })
            }
    }


function clearBox() {
    for (let i = 0; i < 9; i++) {
        var boxes = document.querySelectorAll('.grid-item')
            boxes.forEach(function(box) {
                    document.getElementById(i).style.pointerEvents = "auto";
            })
    }   
}
function Game(p1, p2, symbol) {
    /*Control the game flow*/
    const gameboard = Gameboard();
    DisplayGameboard(gameboard);
    const player1 = Player(p1, symbol);
    const player2 = Player(p2, selectSymbol(symbol));
    let currentPlayer = player1;
    clearBox();
    let winner = "none";
    document.getElementById("info").innerHTML = currentPlayer.name + "'s turn";
    document.getElementById("restart").style.display = "block";

    if (winner == "none") {
        var boxes = document.querySelectorAll('.grid-item')
            boxes.forEach(function(box) {
                box.addEventListener('click', function() {
                    var boxId = this.getAttribute('id');
                    document.getElementById(boxId).style.pointerEvents="none"
                    playerMove(boxId, currentPlayer, gameboard);
                    winner = checkWin(gameboard, currentPlayer);

                    currentPlayer = switchPlayer(currentPlayer, player1, player2);
                    document.getElementById("info").innerHTML = currentPlayer.name + "'s turn";


                    if (winner != "none") {
                        console.log(winner, "wins");
                        document.getElementById("info").innerHTML = winner + " wins";
                        blockBox();
                    }

                    if (winner == "none" && (checkDraw(gameboard))) {
                        document.getElementById("info").innerHTML = "Draw";
                    }
                })
            })  
    }
}

function reload() {
    location.reload();
}

blockBox();