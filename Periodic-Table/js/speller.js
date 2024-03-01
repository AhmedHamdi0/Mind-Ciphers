export default {
    check,
    lookup,
};

let elements;
let symbols = {};

await loadPeriodicTable();

async function loadPeriodicTable() {
    elements = await (await fetch("periodic-table.json")).json();
    construct_symbols_index();
}

// Construct a data structure that holds the symbol as key and a whole element as value
function construct_symbols_index(){
    for (let element of elements){
        symbols[element.symbol.toLowerCase()] = element;
    }
}

// Create an array of one and two letters of the input word
function findCandidates(inputWord) {
    let oneLetterSymbols = [];
    let twoLetterSymbols = [];

    for (let i = 0; i < inputWord.length; i++) {
        // Collect one-letter symbols
        let oneLetter = inputWord[i];
        if(oneLetter in symbols && !oneLetterSymbols.includes(oneLetter)){
            oneLetterSymbols.push(oneLetter);
        }

        // Collect two-letter symbol
        if (i <= inputWord.length - 2){
            let twoLetters = inputWord.slice(i, i+2);
            if (twoLetters in symbols && !twoLetterSymbols.includes(twoLetters)){
                twoLetterSymbols.push(twoLetters);
            }
        }
    }
    return [...twoLetterSymbols, ...oneLetterSymbols];
}

// check every element for a symbol matching the next 1-2 characters of the input word
function check(inputWord) {
    let candidates = findCandidates(inputWord);
    return spellWord(candidates, inputWord);
}

function spellWord(candidates,charsLeft) {
    if (charsLeft.length === 0) {
        return [];
    }
    else {
        // check for two letter symbols first
        if (charsLeft.length >= 2) {
            let twoLetters = charsLeft.slice(0,2);
            let restLetters = charsLeft.slice(2);
            if (candidates.includes(twoLetters)) {
                if (restLetters !== "") {
                    let result = [ twoLetters, ...spellWord(candidates,restLetters) ];
                    if (result.join("") === charsLeft) {
                        return result;
                    }
                }
                else {
                    return [ twoLetters ];
                }
            }
        }
        // now check for one letter symbols
        if (charsLeft.length >= 1) {
            let oneLetter = charsLeft[0];
            let restLetters = charsLeft.slice(1);
            if (candidates.includes(oneLetter)) {
                if (restLetters !== "") {
                    let result = [ oneLetter, ...spellWord(candidates,restLetters) ];
                    if (result.join("") === charsLeft) {
                        return result;
                    }
                }
                else {
                    return [ oneLetter ];
                }
            }
        }
    }
    return [];
}

// Find the matching symbol (lowercase)
function lookup(elementSymbol) {
    return symbols[elementSymbol];
}
