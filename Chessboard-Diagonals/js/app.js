import Chessboard from "./chessboard.js";

document.addEventListener("DOMContentLoaded", async function ready(){
    let boardElement = document.getElementById("board");
    let clearHighlightsButton = document.getElementById("clear-highlights-btn");

    Chessboard.draw(boardElement);

    boardElement.addEventListener("click",onClickTile,false);
    clearHighlightsButton.addEventListener("click",clearHighlights,false);

    function onClickTile(evt){
        let clickedElement = evt.target;

        if (clickedElement.matches("#board > div > div")) {
            Chessboard.highlightDiagonals(clickedElement);
        }
        else {
            clearHighlights();
        }
    }

    function clearHighlights() {
        Chessboard.highlightDiagonals();
    }
})