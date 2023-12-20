var board = [];
var rows = 8; //This hard codes in the rows for the board, can change later
var columns = 8;

var minesCount = 5; //This hard codes the number of bombs, can be changed later
var minesLocation = []; //The mines locations will be in coordinates

var tilesClicked = 0; //goal to click all tiles except the mines
var flagEnabled = false; //This determines if the user is placing flags or is not

var gameOver = false; //This checks to see if the game is over or not

window.onload = function() { //This function triggers once the window loads
    startGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount; //This prints out at the top the number of mines
    document.getElementById("flag-button").addEventListener("click", setFlag); //This triggers the SetFlag function when the flag-button is clicked
    
    //populate our board
    for (let x = 0; x < rows; x++) { //This creates each row of the board using a for loop
        let row = []; //This will hold the coordinates in each row
        for (let y = 0; y < columns; y++) { //This loop goes through all of the columns
            let tile = document.createElement("div"); 
            tile.id = x.toString() + "-" + y.toString(); //This names the tile id 
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    //console.log(board) 
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function clickTile() {

    let tile = this;
    if (flagEnabled) { //This tests to see if the flag button is clicked on
        if (tile.innerText == "") { //This checks to see if the tile clicked is empty
            tile.innerText = "🚩" //If the tile clicked is empty then a flag will be place there
        }
        else if (tile.innerText == "🚩") { //If the tile has a flag as the text, then when it is clicked it will be taken away
            tile.innerText = "";
        }
    }
}