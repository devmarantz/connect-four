import { BOARDCOLS, BOARDROWS} from './constants.js';

//Check if it's a win
//Update win text (win celebrations)

export function checkWin(col, row, currPlayer, winNum) {
    //check down
    return checkDown(col, row, currPlayer, winNum) || checkAcross(col, row, currPlayer, winNum) || checkDiagonal(col, row, currPlayer, winNum);
    //check across
    
    //check diagonals
    
}

function checkDown(col, row, currPlayer, winNum){
    ////Can't connect if there isn't four
    // if(row< 3) return false;
    if(row< winNum - 1) return false;


    for (let j = row - 1; j > row - winNum; j--){
        const currSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
        if (currSlotPlayer !== currPlayer) return false;
    }

    return true;
}

function checkAcross(col, row, currPlayer, winNum){
    let sameColorNeighbors = 0;

    //check to the right
    for (let i = col + 1; i < col + winNum; i++) {
        //break if out of bounds
        if (i >= BOARDCOLS) break;
        const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    //check to the left
    for (let i = col - 1; i > col - winNum; i--) {
        //break if out of bounds
        if (i < 0) break;
        const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    // return sameColorNeighbors >= 3;
    return sameColorNeighbors >= winNum - 1;

}

function checkDiagonal(col, row, currPlayer, winNum){
    return upLeft(col, row, currPlayer, winNum) || upRight(col, row, currPlayer, winNum);
}

function upLeft(col, row, currPlayer, winNum){
    let sameColorNeighbors = 0;

    //search Up Left
    for (let i =1; i < winNum; i++){
        //break if out of bounds
        if (col - i < 0 || row + i >=BOARDROWS) break;
        const currSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    //search Down RIght
    for (let i = 1; i < winNum; i++){
        //break if out of bounds
        if (col + i >= BOARDCOLS || row - i < 0) break;
        const currSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }
    // return sameColorNeighbors >= 3;
    return sameColorNeighbors >= winNum - 1;
}

function upRight(col, row, currPlayer, winNum){
    let sameColorNeighbors = 0;

    //search Up Right
    for (let i = 1; i < winNum; i++){
        //break if out of bounds
        if (col + i >= BOARDCOLS || row + i >=BOARDROWS) break;
        const currSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }

    //search Down Left
    for (let i = 1; i < winNum; i++){
        //break if out of bounds
        if (col - i < 0 || row - i < 0) break;
        const currSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement.className;
        if(currSlotPlayer === currPlayer) sameColorNeighbors++;
        else break;
    }
    // return sameColorNeighbors >= 3;
    return sameColorNeighbors >= winNum - 1;
}