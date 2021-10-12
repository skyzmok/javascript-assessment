const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const field = [];

// function to create the field
function createField (rows, heights){
    for(let x=0; x< rows; x++){
        let rowArray = [];
        for(let y=0; y<heights; y++)
        {       
            const inputX = Math.round(Math.random()*10);
            if (inputX <= 8){
                rowArray.push(fieldCharacter);
            }
            
            else{
                rowArray.push(hole);
            }
        }
        field.push(rowArray);
    }
    do{
        field[Math.floor(Math.random()*rows)][Math.floor(Math.random()*heights)] = hat;
        } 
    while (field[0][0] === hat);
   
    field[0][0] = pathCharacter;
    return field;
}


// function to start the game
function userInput(field){
    let colHeight = 0;
    let rowLength = 0;
    let currentHeight = 0;
    let currentLength = 0;
    let pField = field;
    let gameStatus = true
    // for loop to get the field height and width
    for (let i=1; i <= pField.length; i++){
        // console.log(i)
        if (i === pField.length){
            colHeight = i;
            for (let j in pField[i-1]){
                rowLength++
            }
        }
    }
    while(gameStatus === true){

        clear();
        console.log(pField);
        let moving = prompt("Select your move. (u for Up, d for down, l for left and r for right==> ");
        
        // console.log(moving)
        // console.log(rowLength)
        // console.log(colHeight)
        if (moving.toLowerCase() === "u"){
            currentHeight -= 1
            gameStatus = checkStatus(currentHeight, currentLength, colHeight, rowLength, pField)
            // return gameStatus
        }
        else if(moving.toLowerCase() === "d"){
            currentHeight += 1
            gameStatus = checkStatus(currentHeight, currentLength, colHeight, rowLength, pField)
            // return gameStatus
        }
        else if(moving.toLowerCase() === "l"){
            currentLength -= 1
            gameStatus = checkStatus(currentHeight, currentLength, colHeight, rowLength, pField)
            // return gameStatus
        }
        else if(moving.toLowerCase() === "r"){
            currentLength += 1
            gameStatus = checkStatus(currentHeight, currentLength, colHeight, rowLength, pField)       
        }

    }   
    // console.log(gameStatus)
}


// function to check game status
function checkStatus(currentHeight, currentLength, colHeight, rowLength, field){
    let ph = currentHeight;
    let pl = currentLength;
    let ch = colHeight;
    let rl = rowLength;
    let gameStatus = true

    if (pl > rl || pl < 0 || ph > ch || ph < 0){
        console.log(field);
        console.log("You move out of the field. You Lose!");
        gameStatus = false;
    }
    else if (field[ph][pl] === hole){
        field[ph][pl] = "X";
        console.log(field);
        console.log("You fell into a hole. You Lose!");
        gameStatus = false;
    }
    else if (field[ph][pl] === hat){
        field[ph][pl] = pathCharacter;
        console.log(field);
        console.log("You found your hat! You Win!");
        gameStatus = false;
    }
    else{
        field[ph][pl] = pathCharacter;
        console.log(field);
    }
    return gameStatus;    
}

// prompt user to select array size and game start after selection
const gRow = prompt("Select game row between 3 to 6 ==> ")
console.log(`You have chosen ${gRow}`)
const gHeight = prompt("Select game height between 5 to 8 ==> ")
console.log(`You have chosen ${gHeight}`)
clear()
userInput(createField (gHeight, gRow ))


