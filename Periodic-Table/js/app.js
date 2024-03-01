import Speller from "./speller.js";


if (/complete|interactive|loaded/.test(document.readyState)) {
    ready();
}
else {
    document.addEventListener("DOMContentLoaded",ready);
}

function ready(){
    let enterWordElement = document.getElementById("enter-word");
    let spellBtn = document.getElementById("spell-btn");
    let wordSpellingElement = document.getElementById("word-spelling");

    enterWordElement.addEventListener('keydown', onKeydown, false)
    spellBtn.addEventListener('click', checkWord, false)

    function onKeydown(evt) {
        if (evt.key === "Enter") {
            checkWord();
        }
    }

    function checkWord(){
        let inputWord = enterWordElement.value.toLowerCase().trim()
        enterWordElement.value = inputWord

        if (!/^[a-z]{3,}$/.test(inputWord)) {
            alert("Enter a word at least 3 letters long!");
            return;
        }

        let symbols = Speller.check(inputWord);

        if (symbols.length > 0){
            enterWordElement.value = "";
            spellWord(symbols);
        } else {
            wordSpellingElement.innerHTML = "<strong>-- couldn't spell it! --</strong>";
        }
    }

    function spellWord(symbols){
        wordSpellingElement.innerHTML = "";

        for (let symbol of symbols) {
            let elementEntry = Speller.lookup(symbol);
            let elementDiv = document.createElement("div");
            elementDiv.className = "element";
            elementDiv.innerHTML = `
				<div class="number">${elementEntry.number}</div>
				<div class="symbol">${elementEntry.symbol}</div>
				<div class="name">${elementEntry.name}</div>
			`;
            wordSpellingElement.appendChild(elementDiv);
        }
    }
}