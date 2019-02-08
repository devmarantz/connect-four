const BOARDCOLS = 7;
const BOARDROWS = 6;


const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');

//board.innerHTML = <p>Hi</p>;


//setup board
// define bounds: x y 
// define direction: 

let boardHTML = '';

//// To enable ONLY first row
// type="checkbox" ${row > 0 ? 'disabled' : ''}

for(let row = BOARDROWS - 1; row >= 0; row--){
    for(let col = 0; col < BOARDCOLS; col++){
        boardHTML += `
            <div class="slot">
                <label for="slot${col}${row}">
                    <input onchange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row='${row}' data-col='${col}' >
                </label>
            </div>
        `;
    }
}

//Set the board's HTML
board.innerHTML = boardHTML;

let player1Turn = true;
function runTurn(input){
    ////alert(`I'm in a function!`);


    //change color of label
    input.parentElement.className = player1Turn ? 'player1' : 'player2';
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
    //change what's disabled
        //disable the input
    input.disabled = true;

        //enable to slow at (row + 1)
    // const row = input.dataset.row;
    // const col = input.dataset.col;
    // console.log(row, col);

    const { row, col } = input.dataset;
    if(row < BOARDROWS - 1){
        const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
        neighbor.disabled = false;
    }

    // document.getElementById
}
