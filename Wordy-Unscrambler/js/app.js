import Wordy from "./wordy.js";


document.addEventListener("DOMContentLoaded",async function ready(){
    let dictionarySelectorEl = document.getElementById("dictionary-selector");
    let dictionaryEntriesLengthEl = document.getElementById("dictionary-entries-length");
    let loadTimingEl = document.getElementById("load-timing");
    let enterLettersEl = document.getElementById("enter-letters");
    let inputLettersEl = document.getElementById("input-letters");
    let unscrambleTimingEl = document.getElementById("unscramble-timing");
    let unscrambleBtn = document.getElementById("unscramble-btn");
    let wordListEl = document.getElementById("word-list");

    await loadWordList();

    // once word list is loaded, enable the UI
    unscrambleBtn.disabled = false;

    dictionarySelectorEl.addEventListener("change",loadWordList,false);
    enterLettersEl.addEventListener("keydown",onKeydown,false);
    unscrambleBtn.addEventListener("click",unscrambleLetters,false);


    function onKeydown(evt) {
        if (evt.key === "Enter") {
            unscrambleLetters();
        }
    }

    function unscrambleLetters() {
        let letters = enterLettersEl.value.toUpperCase().trim();
        enterLettersEl.value = letters;

        // validate the input
        if (!/^[A-Z]{3,}$/.test(letters)) {
            alert("Enter at least 3 letters!");
            return;
        }

        let startTiming = performance.now();
        // find matching words
        let words = Wordy.findWordsWithWordGraph(letters);
        let endTiming = performance.now();
        printTiming(unscrambleTimingEl,Number(endTiming - startTiming) || 0);

        // any words found?
        if (words.length > 0) {
            enterLettersEl.value = "";
            inputLettersEl.innerHTML = `Input: <strong>${letters}</strong>`;
            wordListEl.innerHTML = words.join("<br>");
        }
        else {
            inputLettersEl.innerHTML = "";
            wordListEl.innerHTML = "<strong>--empty--</strong>";
        }
    }

    async function loadWordList() {
        let whichList = dictionarySelectorEl.value;
        if ([ "tiny", "short", "long", ].includes(whichList)) {
            let wordList = await (await fetch(`${whichList}-word-list.json`)).json();

            let startTiming = performance.now();
            let length = Wordy.buildWordGraph(wordList);
            let endTiming = performance.now();
            printTiming(loadTimingEl,Number(endTiming - startTiming) || 0);

            dictionaryEntriesLengthEl.innerText = `(entries: ${length})`;

            inputLettersEl.innerHTML = "";
            unscrambleTimingEl.innerHTML = "";
            wordListEl.innerHTML = "<strong>--empty--</strong>";
        }
    }

    function printTiming(timingEl,ms) {
        ms = Number(ms.toFixed(1));

        if (ms >= 50) {
            timingEl.innerHTML = `(<strong>${(ms / 1000).toFixed(2)}</strong> sec)`;
        }
        else {
            timingEl.innerHTML = `(<strong>${ms.toFixed(1)}</strong> ms)`
        }
    }

});