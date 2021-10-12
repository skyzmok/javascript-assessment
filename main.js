const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const field = [];

// creating field
function createField (rows, heights){
    for(let x=0; x< rows; x++){
        let rowArray = [];
        for(let y=0; y<heights; y++)
        {       
            inputX = randomInput();
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
        } while (field[0][0] === hat)

    field[0][0] = pathCharacter;
    return field;
}

function randomInput(){
    const input = Math.round(Math.random()*10);
    return input;
}


x = createField(8,5)
console.log(x)