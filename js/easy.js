let turn = "X";
let point_x = 0;
let point_y = 0;
const matches_to_win = 5;

let button_states = [
    "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", 
    "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", 
    "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", 
    "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", 
    "unclicked", "unclicked", "unclicked", "unclicked", "unclicked", "unclicked"
]

const winCombos = [

    // lahat ng horizontal
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],

    // lahat ng vertical
    [0, 6, 12, 18, 24],
    [1, 7, 13, 19, 25],
    [2, 8, 14, 20, 26],
    [3, 9, 15, 21, 27],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29],

    // lahat ng diagonal from bottom-left to top-right
    [18, 25],
    [12, 19, 26],
    [6, 13, 20, 27],
    [0, 7, 14, 21, 28],
    [1, 8, 15, 22, 29],
    [2, 9, 16, 23],
    [3, 10, 17],
    [4, 11],

    // lahat ng diagonal from top-left to bottom-right
    [6, 1],
    [12, 7, 2],
    [18, 13, 8, 3],
    [24, 19, 14, 9, 4],
    [25, 20, 15, 10, 5],
    [26, 21, 16, 11],
    [27, 22, 17],
    [28, 23],

]

function buttonFunc(buttonNum) {
    let buttonID = "but" + buttonNum;
    let button = document.getElementById(buttonID);
    let winner = ""

    if (button_states[buttonNum] == "X" || button_states[buttonNum] == "O" || button_states[buttonNum] == "clicked") {
        return
    }

    function player_move () {
        if (button_states[buttonNum] == "unclicked") {
            button_states[buttonNum] = turn;
            button.innerHTML = turn;
        } else if (button_states[buttonNum] == "X" || button_states[buttonNum] == "O" || button_states[buttonNum] == "clicked") {
            return
        }
    }

    function ai_move () {
        let avail_tiles=[] //stores the index that are not yet clicked
        for (let i = 0; i < button_states.length; i++) {
            if (button_states[i] == "unclicked") {
                avail_tiles.push(i);
            }
        }
        //document.getElementById("result").innerHTML = avail_tiles;  
        let ai_move = avail_tiles[(Math.floor(Math.random() * avail_tiles.length))]
        //document.getElementById("result").innerHTML += "   :" + ai_move;  
        //console.log(ai_move)
        let ai_but_num = "but" + ai_move;
        let ai_button = document.getElementById(ai_but_num);

        if (button_states[ai_move] == "unclicked") {
            ai_button.innerHTML = turn;
            button_states[ai_move] = turn;
        } else if (button_states[ai_move] == "X" || button_states[ai_move] == "O" || button_states[ai_move] == "clicked") {
            return
        }
    }

    function check_win() {    
        for (let i = 0; i < winCombos.length; i++) {
            const combo = winCombos[i];
            const symbols = combo.map(index => button_states[index]);
    
            if (symbols.every(symbol => symbol === turn && symbol !== "unclicked")) {
                winner = turn;
                break;
            }
        }

        if (winner == "X" || winner == "O") {
            document.getElementById("result").innerHTML = "The winner is " + winner;

            // ======== #332941
            let a = null;
            for (let j=0; j<winCombos.length; j++) {
                temp = [];
                for (let k=0; k<winCombos[j].length; k++) {
                    temp.push(button_states[winCombos[j][k]]);
                }

                const combChecker = temp.every(element => element == winner);
                if (combChecker) {
                    a = winCombos[j]
                    for (l=0; l<a.length; l++) {
                        butid="but" + a[l];
                        document.getElementById(butid).style.backgroundColor = "#332941";
                    }
                    break;
                }
            }

            // ========

            let i = 0;
            const end = 29;
            while (i <= end) {
                button_states[i] = "clicked";
                i++;
            }
            
            if (winner == "X") {
                point_x++;
                document.getElementById("scoreboard").innerHTML = "X - " + point_x + " | O - " + point_y;
            }

            if (winner == "O") {
                point_y++;
                document.getElementById("scoreboard").innerHTML = "X - " + point_x + " | O - " + point_y;
            }

            if (point_x == matches_to_win) {
                document.getElementById("result").innerHTML = "Game Over: X has won!";
            }
    
            if (point_y == matches_to_win) {
                document.getElementById("result").innerHTML = "Game Over: O has won!";
            }

            winner = "";

            return;
        }
    
        const isXorO = element => element === 'X' || element === 'O';
        const allElementsAreXorO = button_states.every(isXorO);

        if (allElementsAreXorO) {
            document.getElementById("result").innerHTML = "Draw!"
            let i = 0;
            let id="but" + i;
            while (i <= 29) {
                document.getElementById(id).style.backgroundColor="#332941";
                i++;
                id="but" + i;
            }
            
            return
        } else {
            return
        }
    }

    
    function change_turn() {
        if (turn == "X") {
            turn = "O";
        } else {
            turn = "X";
        }
    }

    player_move();
    check_win();
    change_turn();

    ai_move();
    check_win();
    change_turn();

    updateButtonsVisibility();
}

function nextg_button () {
    if (point_x >= matches_to_win || point_y >= matches_to_win) {
        point_x = 0;
        point_y = 0;
        document.getElementById("scoreboard").innerHTML = "X - " + point_x + " | O - " + point_y;
        document.getElementById("result").innerHTML= ""
    }

    turn = "X"
    let i = 0;
    const end = 29;
    butid = "but" + i;
    while (i <= end) {
        button_states[i] = "unclicked";
        document.getElementById(butid).innerHTML= "";
        document.getElementById(butid).style.backgroundColor="#864AF9";
        i++;
        butid = "but" + i;
    }
    document.getElementById("result").innerHTML= "";
    updateButtonsVisibility();
}

function reset_score() {
    point_x = 0;
    point_y = 0;
    document.getElementById("scoreboard").innerHTML = "X - " + point_x + " | O - " + point_y;
    document.getElementById("result").innerHTML= ""

    turn = "X"
    let i = 0;
    const end = 29;
    butid = "but" + i;
    while (i <= end) {
        button_states[i] = "unclicked";
        document.getElementById(butid).innerHTML= "";
        document.getElementById(butid).style.backgroundColor="#864AF9";
        i++;
        butid = "but" + i;
    }
    document.getElementById("result").innerHTML= ""
    updateButtonsVisibility();
} 

function updateButtonsVisibility() {
    const resetBoardButton = document.getElementById("nextg");
    const resetScoreButton = document.getElementById("reset_score");
    const resetAllButton = document.getElementById("resetAllButton");

    if (point_x >= matches_to_win || point_y >= matches_to_win) {
        resetBoardButton.style.display = "none";
        resetScoreButton.style.display = "none";
        resetAllButton.style.display = "block";
    } else {
        resetBoardButton.style.display = "block";
        resetScoreButton.style.display = "block";
        resetAllButton.style.display = "none";
    }
}

function resetAllGame() {
    point_x = 0;
    point_y = 0;
    turn = "X";
    button_states.fill("unclicked");
    for (let i = 0; i <= 29; i++) {
        document.getElementById("but" + i).innerHTML = "";
    }
    document.getElementById("scoreboard").innerHTML = "X - " + point_x + " | O - " + point_y;
    document.getElementById("result").innerHTML = "";

    let i = 0;
    const end = 29;
    butid = "but" + i;
    while (i <= end) {
        button_states[i] = "unclicked";
        document.getElementById(butid).innerHTML= "";
        document.getElementById(butid).style.backgroundColor="#864AF9";
        i++;
        butid = "but" + i;
    }

    updateButtonsVisibility();
}