var board = [];
var rows = 8;
var columns = 8;

var minesCount = 5;
var minesLocation = []; //The mines locations will be in coordinates

var tilesClicked = 0; //goal to click all tiles except the mines
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    startGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;

    //populate our board
    for (let x = 0; x < rows; x++) {
        let row = [];
        for (let y = 0; y < columns; y++) {
            let tile = document.createElement("div");
            tile.id = x.toString() + "-" + y.toString();
            
        }
    }
}