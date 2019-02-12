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


    //Check if it's a win
    let isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');
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



//Check if it's a win
//Update win text (win celebrations)

function checkWin(col, row, currPlayer) {
    //check down
    return checkDown(col, row, currPlayer) || checkAcross(col, row, currPlayer) || checkDiagonal(col, row, currPlayer);
    //check across
    
    //check diagonals
    
}

function checkDown(col, row, currPlayer){
    if(row< 3) return false; //Can't connect if there isn't four

    for (let j = row - 1; j > row - 4; j--){
        const currSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
        if (currSlotPlayer !== currPlayer) return false;
    }

    return true;
}

function checkAcross(col, row, currPlayer){
    let sameColorNeighbors = 0;

    //check to the right
    for (let i = col + 1; i < col + 4; i++) {
        //break if out of bounds
        if (i >= BOARDCOLS) break;
        const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    //check to the left
    for (let i = col - 1; i > col - 4; i--) {
        //break if out of bounds
        if (i < 0) break;
        const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    return sameColorNeighbors >= 3;
}

function checkDiagonal(col, row, currPlayer){
    return upLeft(col, row, currPlayer) || upRight(col, row, currPlayer);
}

function upLeft(col, row, currPlayer){
    let sameColorNeighbors = 0;

    //search Up Left
    for (let i =1; i < 4; i++){
        //break if out of bounds
        if (col - i < 0 || row + i >=BOARDROWS) break;
        const currSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    //search Down RIght
    for (let i = 1; i < 4; i++){
        //break if out of bounds
        if (col + i >= BOARDCOLS || row - i < 0) break;
        const currSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }
    return sameColorNeighbors >= 3;
}

function upRight(col, row, currPlayer){
    let sameColorNeighbors = 0;

    //search Up Right
    for (let i = 1; i < 4; i++){
        //break if out of bounds
        if (col + i >= BOARDCOLS || row + i >=BOARDROWS) break;
        const currSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    //search Down Left
    for (let i = 1; i < 4; i++){
        //break if out of bounds
        if (col - i < 0 || row - i < 0) break;
        const currSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }
    return sameColorNeighbors >= 3;
}