export default {
    draw, highlightDiagonals
}

const ROWS_NUM = 8;
const COLS_NUM = 8;
const MAJOR_DIAGONAL_NUM = 7;
const MINOR_DIAGONAL_NUM = 15;
const DIAGONALS_NUMBER = 30;

let diagonals = [];
let tileDiagonals = new Map();
let tileHighlightedDiagonals = [];

function draw(boardElement){
    create_diagonals_data_structure();

    for (let row = 0; row < ROWS_NUM; row++) {
        let rowElement = document.createElement("div");
        for (let col = 0; col < COLS_NUM; col++) {
            let tileElement = document.createElement("div");
            rowElement.appendChild(tileElement);

            let majorDiagonal = diagonals[get_major_diagonal_index(row, col)];
            let minorDiagonal = diagonals[get_minor_diagonal_index(row, col)];

            majorDiagonal.push(tileElement);
            minorDiagonal.push(tileElement);

            tileDiagonals.set(tileElement, [majorDiagonal, minorDiagonal]);
        }
        boardElement.appendChild(rowElement);
    }
}

function highlightDiagonals(tileElement) {
    // clear all currently highlighted tiles (if any)
    for (let diagonal of tileHighlightedDiagonals){
        for (let tile of diagonal){
            tile.classList.remove("highlighted");
        }
    }

    // clicked on a board tile?
    if (tileElement) {
        tileHighlightedDiagonals = tileDiagonals.get(tileElement);
        for (let diagonal of tileHighlightedDiagonals){
            for (let tile of diagonal){
                tile.classList.add("highlighted");
            }
        }
    }
}

function create_diagonals_data_structure(){
    for (let i = 0; i < DIAGONALS_NUMBER; i++) {
        diagonals.push([]);
    }
}

function get_major_diagonal_index(row, col){
    return MAJOR_DIAGONAL_NUM - (row - col);
}

function get_minor_diagonal_index(row, col){
    return MINOR_DIAGONAL_NUM + (row + col);
}
