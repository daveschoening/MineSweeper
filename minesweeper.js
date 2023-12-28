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

function setMines() {
   /* minesLocation.push("2-2");
    minesLocation.push("2-3");
    minesLocation.push("5-6");
    minesLocation.push("3-4");
    minesLocation.push("1-1"); */

    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }

    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount; //This prints out at the top the number of mines
    document.getElementById("flag-button").addEventListener("click", setFlag); //This triggers the SetFlag function when the flag-button is clicked
    setMines();
    
    //populate our board
    for (let x = 0; x < rows; x++) { //This creates each row of the board using a for loop
        let row = []; //This will hold the coordinates in each row
        for (let y = 0; y < columns; y++) { //This loop goes through all of the columns
            let tile = document.createElement("div"); 
            tile.id = x.toString() + "-" + y.toString(); //This names the tile id 
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board) 
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
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }
    let tile = this;
    if (flagEnabled) { //This tests to see if the flag button is clicked on
        if (tile.innerText == "") { //This checks to see if the tile clicked is empty
            tile.innerText = "🚩" //If the tile clicked is empty then a flag will be place there
        }
        else if (tile.innerText == "🚩") { //If the tile has a flag as the text, then when it is clicked it will be taken away
            tile.innerText = "";
        }
        return;
    }

    else if (minesLocation.includes(tile.id)) {
        alert("Game Over");
        gameOver = true;
        revealMines();
        return;
    }

    else {
        let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        checkMine(r, c)
    }
}

function revealMines() {
    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;
    let minesFound = 0;

    //top 3
    minesFound += checkTile(r-1, c-1);  //top left
    minesFound += checkTile(r-1, c);  //top middle
    minesFound += checkTile(r-1, c+1);  //top right

    //left and right
    minesFound += checkTile(r, c-1);  //left
    minesFound += checkTile(r, c+1);  //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);  //bottom left
    minesFound += checkTile(r+1, c);  //bottom middle
    minesFound += checkTile(r+1, c+1);  //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    } else {
        //top 3
        checkMine(r-1, c-1);
        checkMine(r-1, c);
        checkMine(r-1, c+1);

        //left and right
        checkMine(r, c-1);
        checkMine(r, c+1);

        //bottom 3
        checkMine(r+1, c-1);
        checkMine(r+1, c);
        checkMine(r+1, c+1);
    }

    if (tilesClicked == (rows * columns) - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }

}


function checkTile (r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    } else if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    } else {
        return 0;
    }
}