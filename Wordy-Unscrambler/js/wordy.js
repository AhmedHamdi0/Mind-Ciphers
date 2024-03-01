import deePool from "./external/deePool.mjs";

export default {
    buildTrieTree,
    findWordsWithTrieTree,
    buildWordGraph,
    findWordsWithWordGraph
};

let dict = {};
let isWord = Symbol("is-word");
let pool = deePool.create(() => []);
pool.grow(23);

// A data structure for the array `wordList` parameter;
// return the number of entries inserted into the data structure
function buildTrieTree(wordList) {
    let nodeCount = 0;

    if (Object.keys(dict).length > 0) {
        dict = {};
    }

    for (let word of wordList) {
        let node = dict;
        for (let letter of word) {
            if (!node[letter]) {
                node[letter] = {
                    [isWord]: false
                };
                nodeCount++;
            }
            node = node[letter];
        }
        node[isWord] = true;
    }
    return nodeCount;
}

function findWordsWithTrieTree(input, prefix="", node=dict) {
    try {
        let allWords = findAllWords(input, prefix, node);
        // return a copy of the words list, so we can keep
        // the current array in the pool and not leak instances
        return [...allWords];
    }
    finally {
        allWords.length = 0;
        pool.recycle(allWords);
    }
}

// Unscrambling/Searching logic for a string of uppercase letters
// in the `input` parameter; return the array of matching words
function findAllWords(input, prefix="", node=dict) {
    let words = pool.use();

    if (node[isWord]) {
        words.push(prefix);
    }

    for (let i = 0; i < input.length; i++) {
        let currentLetter = input[i];

        if (node[currentLetter]) {
            let remainingLetters = pool.use();
            remainingLetters.push(...input.slice(0, i), ...input.slice(i+1));
            let newPrefix = prefix + currentLetter;
            let newNode = node[currentLetter];
            let moreWords = findAllWords(remainingLetters, newPrefix, newNode);
            words.push(...moreWords);

            // reset the temporary arrays and recycle them back to the pool
            remainingLetters.length = moreWords.length = 0;
            pool.recycle(remainingLetters);
            pool.recycle(moreWords);
        }
    }

    let wordSet = new Set(words);
    words.length = 0;
    words.push(...wordSet);
    return words;
}

// DAWG (directed acyclic word graph)
let wordGraph = new MinimalWordGraph();

function buildWordGraph(wordList) {
    if (wordGraph.size() > 0) {
        wordGraph = new MinimalWordGraph();
    }

    for (let word of wordList) {
        wordGraph.add(word);
    }

    // performance optimization
    wordGraph.makeImmutable();

    return wordGraph.size();
}

function countLetters(str) {
    let counts = {};
    for (let letter of str) {
        counts[letter] = (counts[letter] || 0) + 1;
    }
    return counts;
}

function findWordsWithWordGraph(input) {
    let inputCounts = countLetters(input);
    input = [ ...(new Set(input)) ];

    // search the minimum-word-graph for words matching the input letters
    let words = wordGraph.containsOnly(
        Array.isArray(input) ? input :
            typeof input == "string" ? input.split("") :
                []
    );

    // filter out words whose letter counts exceed the input letter counts
    return words.filter(function removeWords(word){
        let wordLetterCounts = countLetters(word);
        for (let [ letter, count ] of Object.entries(wordLetterCounts)) {
            if (!inputCounts[letter] || count > inputCounts[letter]) {
                return false;
            }
        }
        return true;
    });
}

// Permutation
function findMatch(word, input) {
    return permute("", input);

    function permute(prefix, remaining) {
        for (let i = 0; i < remaining.length; i++) {
            let currentWord = prefix + remaining[i];

            if (currentWord === word) {
                return true;
            }
            else if (remaining.length > 1 && currentWord.length < word.length) {
                let newRemaining = remaining.slice(0, i) + remaining.slice(i+1);
                if (permute(currentWord, newRemaining)) {
                    return true;
                }
            }
        }
        return false;
    }
}