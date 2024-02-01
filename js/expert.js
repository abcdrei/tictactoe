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

const winCombos = [ //27 combinations in total

    //prio 1 (2-tile combination)
    
    [6, 1], //0
    [4, 11], //1
    [18, 25],  //2
    [28, 23], //3

    //prio 2 (3-tile combination)
    [3, 10, 17], //4
    [12, 19, 26], //5
    [12, 7, 2], //6
    [27, 22, 17], //7

    //prio 3 (4-tile combination)
    [2, 9, 16, 23], //8
    [6, 13, 20, 27], //9
    [18, 13, 8, 3], //10
    [26, 21, 16, 11], //11

    //prio 4 (5-tile combination)
    [0, 6, 12, 18, 24], //12
    [1, 7, 13, 19, 25], //13
    [2, 8, 14, 20, 26], //14
    [3, 9, 15, 21, 27], //15
    [4, 10, 16, 22, 28], //16
    [5, 11, 17, 23, 29], //17
    [0, 7, 14, 21, 28], //18
    [1, 8, 15, 22, 29], //19
    [24, 19, 14, 9, 4], //20
    [25, 20, 15, 10, 5], //21

    //prio 5 (6-tile combination)
    [0, 1, 2, 3, 4, 5], //22
    [6, 7, 8, 9, 10, 11], //23
    [12, 13, 14, 15, 16, 17], //24
    [18, 19, 20, 21, 22, 23], //25
    [24, 25, 26, 27, 28, 29], //26

]

function buttonFunc(buttonNum) {
    let buttonID = "but" + buttonNum;
    let button = document.getElementById(buttonID);
    let winner = ""

    if (button_states[buttonNum] == "X" || button_states[buttonNum] == "O" || button_states[buttonNum] == "clicked") {
        return
    }

    function ai_move () {
        let button_index = null;
        let button_id = null;
        let ai_button = null;

        for (let i=0; i < winCombos.length; i++) {
            let x = [];
            let maxlength = winCombos[i].length;
            let unclicked = [];
            for (let j=0; j < maxlength; j++) {
                if (button_states[winCombos[i][j]] == "X") {
                    x.push(winCombos[i][j]);
                } else if (button_states[winCombos[i][j]] == "unclicked") {
                    unclicked.push(winCombos[i][j]);
                }
            }
            if (x.length == (maxlength - 1) && (unclicked.length == 1)) {
                button_index = unclicked[0];
                break;
            } 

            let o = [];
            maxlength = winCombos[i].length;
            unclicked = [];
            for (let j=0; j < maxlength; j++) {
                if (button_states[winCombos[i][j]] == "O") {
                    o.push(winCombos[i][j]);
                } else if (button_states[winCombos[i][j]] == "unclicked") {
                    unclicked.push(winCombos[i][j]);
                }
            }
            if (o.length == (maxlength - 1) && (unclicked.length == 1)) {
                button_index = unclicked[0];
                break;
            } 
        

            let container = [];
            for (let j=0; j < winCombos.length; j++) {
                let temp = [];
                for (let k=0; k < winCombos[j].length; k++) {

                    temp.push([button_states[winCombos[j][k]], winCombos[j][k]])                        
                }
                container.push(temp);
            }
            let critical = [];
            
            for (let j=0; j < container.length; j++) {
                let x_count = 0;
                let un_count = 0;
                for (let k=0; k < container[j].length; k++) {
                    if (container[j][k][0] == "X") {
                        x_count += 1;
                    } else if (container[j][k][0] == "unclicked") {
                        un_count += 1;
                    }
                }

                if (x_count == (container[j].length - 1) && un_count == 1) {
                    critical.push(container[j]);
                    break
                } 
            }

            if (critical.length == 1) {
                for (let z=0; z < critical[0].length; z++) {
                    if (critical[0][z][0] == "unclicked") {
                        button_index = critical[0][z][1];
                        break;
                    }
                }
            } else {
                let lol = [
                    6, 1, 
                    4, 11, 
                    18, 25, 
                    28, 23, 
                    3, 10, 17, 
                    12, 19, 26, 
                    12, 7, 2, 
                    27, 22, 17, 
                    2, 9, 16, 23, 
                    6, 13, 20, 27, 
                    18, 13, 8, 3, 
                    26, 21, 16, 11, 
                    0, 6, 12, 18, 24, 
                    1, 7, 13, 19, 25, 
                    2, 8, 14, 20, 26, 
                    3, 9, 15, 21, 27, 
                    4, 10, 16, 22, 28, 
                    5, 11, 17, 23, 29, 
                    0, 7, 14, 21, 28, 
                    1, 8, 15, 22, 29, 
                    24, 19, 14, 9, 4, 
                    25, 20, 15, 10, 5, 
                    0, 1, 2, 3, 4, 5, 
                    6, 7, 8, 9, 10, 11, 
                    12, 13, 14, 15, 16, 17, 
                    18, 19, 20, 21, 22, 23, 
                    24, 25, 26, 27, 28, 29]
                let z = 0;
                while (z < lol.length) {
                    if (button_states[lol[z]] == "unclicked") {
                        button_index = lol[z];
                        break
                    }
                    z+=1
                }

            }
            
        }

        button_id = "but" + button_index;   
        ai_button = document.getElementById(button_id);

        if (button_states[button_index] == "unclicked") {
            ai_button.innerHTML = turn;
            button_states[button_index] = turn;
        } else if (button_states[button_index] == "X" || button_states[button_index] == "O" || button_states[button_index] == "clicked") {
            return
        }
    }

    function player_move () {
        if (button_states[buttonNum] == "unclicked") {
            button_states[buttonNum] = turn;
            button.innerHTML = turn;
        } else if (button_states[buttonNum] == "X" || button_states[buttonNum] == "O" || button_states[buttonNum] == "clicked") {
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
}

function nextg_button () {
    if (point_x >= matches_to_win || point_y >= matches_to_win) {
        turn = "X"
        let i = 0;
        const end = 29;
        butid = "but" + i;
        while (i <= end) {
            button_states[i] = "unclicked";
            document.getElementById(butid).innerHTML= "";
            i++;
            butid = "but" + i;
        }

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
        i++;
        butid = "but" + i;
    }
    document.getElementById("result").innerHTML= "";
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
        i++;
        butid = "but" + i;
    }
    document.getElementById("result").innerHTML= ""
} 