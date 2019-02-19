import { BOARDCOLS, BOARDROWS} from './constants.js';
import { checkWin } from './win-logic.js';





const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');

//Gets Connect Value from select menu
// var connectID = document.getElementById('connectValue');
// var connectNum = connectID.options[connectID.selectedIndex].value;


//board.innerHTML = <p>Hi</p>;


//setup board
// define bounds: x y 
// define direction:
let boardHTML = '';

//// To enable ONLY first row
// type="checkbox" ${row > 0 ? 'disabled' : ''}

for(let row = BOARDROWS - 1; row >= 0; row--){
    for(let col = 0; col < BOARDCOLS; col++){
        boardHTML += /* HTML */`
            <div class="slot">
                <label for="slot${col}${row}">
                    <input type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row='${row}' data-col='${col}' >
                </label>
            </div>
        `;
    }
}

//Set the board's HTML the first time
board.innerHTML = boardHTML;

//Fixes HTML to CSS functions
document.querySelectorAll('input').forEach(input => input.addEventListener('change', runTurn));

let player1Turn = true;


function runTurn(event){
    const input = event.target;
    //change color of label
    input.parentElement.className = player1Turn ? 'player1' : 'player2';
    
    //change what's disabled
    //disable the input
    input.disabled = true;
    
    const { row, col } = input.dataset;
    
    if(row < BOARDROWS - 1){
        const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
        neighbor.disabled = false;
    }

    //Getting the Value the select menu
    const connectID = document.getElementById('connectValue');
    const connectNum = connectID.options[connectID.selectedIndex].value;
    
    
    //Check if it's a win
    let isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2', connectNum);
    if (isWin){
        alert('Winner!!');
        return;
    }
    // update win text ( win celebrations)
    
    //change whose turn it is
    player1Turn = !player1Turn;  
    
    // update player-indication text
    if(player1Turn){
        playerIndicator.innerText = 'Player 1';
        playerIndicator.className = 'player1';
    }else{
        playerIndicator.innerText = 'Player 2';
        playerIndicator.className = 'player2';
    }
}

function initialize(){
    
    // set and reset player
    player1Turn = true;
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
    
    //Set the board's HTML the first time
    board.innerHTML = boardHTML;
    
    //Fixes HTML to CSS functions
    document.querySelectorAll('input').forEach(input => input.addEventListener('change', runTurn));
}

//Fix HTML to CSS function
window.runTurn = runTurn;

document.getElementById('reset-button').addEventListener('click', initialize);

