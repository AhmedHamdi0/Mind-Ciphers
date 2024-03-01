const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const deposit = () => {
    while(true){
        const enteredDepositAmount = prompt("Enter a deposit amount: ");
        var depositAmount = parseFloat(enteredDepositAmount);

        if(isNaN(depositAmount) || depositAmount <= 0){
            console.log('Invalid Deposit Amount, Try Again!');   
        }else {
            return depositAmount;
        }
    }
};
 

const getNumberOfLines = () => {
    while(true){
        const enteredNumberOfLines = prompt("Enter number of lines to bet on [1-3]: ");
        var lines = parseFloat(enteredNumberOfLines);

        if(isNaN(lines) || lines <= 0 || lines > 3){
            console.log('Invalid Lines Number, Try Again!');   
        } else {
            return lines;
        }
    }
}


const getBet = (balance, lines) => {
    while(true){
        const enteredBet = prompt("Enter the bet per line: ");
        var bet = parseFloat(enteredBet);
        const maxAllowedBet = balance / lines;

        if(isNaN(bet) || bet <= 0 || bet > maxAllowedBet){
            console.log('Invalid Bet, Try Again!');   
        } else {
            return bet;
        }
    }
}


const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}


const transpose = (reels) => {
    const reelRows = [];
    
    for(let i = 0; i < ROWS; i++){
        reelRows.push([]);
        for(let j = 0; j < COLS; j++){
            reelRows[i].push(reels[j][i]);
        }
    }
    return reelRows;
}


const printReels = (reelRows) => {
    console.log("-------------");
    for(const row of reelRows) {
        let reelString = "| ";
        for (const [i, symbol] of row.entries()) {
            reelString += symbol + " | ";
        }
        console.log(reelString);
        console.log("-------------");
    }
}


const getWinnings = (reelRows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = reelRows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}


const game = () => {
    let balance = deposit();

    while (true) {
        console.log("Your balance: $" + balance);
        const lines = getNumberOfLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const reelRows = transpose(reels);
        printReels(reelRows);
        const winnings = getWinnings(reelRows, bet, lines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money!!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?: ");

        if(playAgain != "y") break;
    }
}

game();
