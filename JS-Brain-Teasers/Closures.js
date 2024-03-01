// Closures, Scope, and Execution Context
// Uncomment the lines after each function to check your work

const createFunction = () => {
    return () => console.log('hello');
}

const function1 = createFunction();
// function1(); //-> hello;


const createFunctionPrinter = (input) => () => console.log(input);

const printSample = createFunctionPrinter('sample');
// printSample(); //-> sample
const printHello = createFunctionPrinter('hello');
// printHello(); //-> hello


const outer = () => {
    let counter = 0;
    return incrementCounter = () => {
        counter++;
        console.log('counter', counter);
    }
}

const willCounter = outer();
const jasCounter = outer();

// willCounter(); //-> 1
// willCounter(); //-> 2
// willCounter(); //-> 3
// jasCounter();  //-> 2
// willCounter(); //-> 4


const addByX = (x) => {
    let step = x;
    return input => console.log(`addBy${step}: ${input + step}`);
}

// const addByTwo = addByX(2);
// addByTwo(1); //-> 3
// addByTwo(2); //-> 4
// addByTwo(3); //-> 5

const addByThree = addByX(3);
// addByThree(1); //-> 4
// addByThree(2); //-> 5

const addByFour = addByX(4);
// addByFour(4); //-> 8
// addByFour(5); //-> 9


const once = (func) => {
    let output;
    return x => {
        if (output > 0) {
            return output;
        } else {
            output = func(x)
            return output;
        }
    }
}

const addByTwo = addByX(2);
const onceFunc = once(addByTwo);
// console.log(onceFunc(4));  //-> 6
// console.log(onceFunc(10));  //-> 12
// console.log(onceFunc(9001));  //-> 9003


const after = (count, func) => {
    let numCalls = 0;
    function calledAfter() {
        numCalls++;
        if (numCalls == count) {
            func()
        }
    }
    return calledAfter
}

const called = function () { console.log('hello') };
const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed


const delay = (func, wait, ...params) => {
    return setTimeout(() => func(...params), wait);
}

const cb = function (...params) { console.log("called!", ...params) };
// delay(cb, 1000); // "called!" printed after 1000 ms
// delay(cb, 2000, "param1", "param2"); // "called! param1 param2" printed after 2000 ms


const rollCall = (names) => {
    const namesArray = names;
    return () => {
        if (namesArray.length > 0) {
            console.log(namesArray.shift())
        } else {
            console.log("Everyone accounted for")
        }
    }
}

const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
// rollCaller() //-> 'Victoria'
// rollCaller() //-> 'Juan'
// rollCaller() //-> 'Ruth'
// rollCaller() //-> 'Everyone accounted for'


const saveOutput = (func, magicWord) => {
    const obj = {};
    return input => {
        if (input == magicWord) {
            return obj;
        } else {
            obj[input] = func(input);
            return obj[input];
        }
    }
}

const multiplyBy2 = num => num * 2;
const multBy2AndLog = saveOutput(multiplyBy2, 'magic');
// console.log(multBy2AndLog(2)); //-> 4
// console.log(multBy2AndLog(9)); //-> 18
// console.log(multBy2AndLog('magic')); //-> { 2: 4, 9: 18 }


const cycleIterator = array => {
    let index = 0;
    return () => {
        let output = array[index % array.length]
        index++
        return output
    }
}

const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
// console.log(getDay()); //-> 'Fri'
// console.log(getDay()); //-> 'Sat'
// console.log(getDay()); //-> 'Sun'
// console.log(getDay()); //-> 'Fri'


const defineFirstArg = (func, arg) => {
    return (...params) => {
        return func(arg, ...params);
    }
}

const subtract = (big, small) => big - small;
const subFrom20 = defineFirstArg(subtract, 20);
// console.log(subFrom20(5)); //-> log 15


const dateStamp = (func) => {
    return (...params) => {
        return {
            date: (new Date()).toDateString(),
            output: func(...params)
        };
    }
}

const stampedMultBy2 = dateStamp(n => n * 2);
// console.log(stampedMultBy2(4)); //-> { date: (today's date), output: 8 }
// console.log(stampedMultBy2(6)); //-> { date: (today's date), output: 12 }


const censor = () => {
    let list = [];
    return (str1, str2) => {
        if (str2) {
            list.push({ search: str1, replace: str2 });
            return;
        } else {
            list.map(item => {
                str1 = str1.replace(item.search, item.replace);
            })
            return str1;
        }
    }
}

const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
// console.log(changeScene('The quick, brown fox jumps over the lazy dogs.'));
//-> should log 'The slow, brown fox jumps over the lazy cats.'


const createSecretHolder = secret => {
    let privateSecert = secret;
    const getSecret = () => {
        console.log(privateSecert);
        return privateSecert;
    };
    const setSecret = inputSecert => privateSecert = inputSecert;
    return { getSecret, setSecret };
}

obj = createSecretHolder(5)
// obj.getSecret() //-> 5
// obj.setSecret(2)
// obj.getSecret() //-> 2


const callTimes = () => {
    let count = 0;
    return () => {
        count++;
        console.log('Called:', count);
    }
}

let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
// myNewFunc1(); //-> 1
// myNewFunc1(); //-> 2
// myNewFunc2(); //-> 1
// myNewFunc2(); //-> 2


const roulette = num => {
    let spinner = num;
    return () => {
        if (spinner > 1) {
            spinner--;
            return 'spin';
        } else if (spinner === 1) {
            spinner--;
            return 'win';
        } else {
            return 'pick a number to play again';
        }
    }
}

const play = roulette(3);
// console.log(play()); //-> 'spin'
// console.log(play()); //-> 'spin'
// console.log(play()); //-> 'win'
// console.log(play()); //-> 'pick a number to play again'
// console.log(play()); //-> 'pick a number to play again'


const average = () => {
    const numbers = [];
    return num => {
        if (num) {
            numbers.push(num);
        }

        let average = 0;
        if (numbers.length) {
            average = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
        }
        return average;
    }
}

const avgSoFar = average();
// console.log(avgSoFar()); //-> 0
// console.log(avgSoFar(4)); //-> 4
// console.log(avgSoFar(8)); //-> 6
// console.log(avgSoFar()); //-> 6
// console.log(avgSoFar(12)); //-> 8
// console.log(avgSoFar()); //-> 8


const makeFuncTester = arrOfTests => {
    let tests = arrOfTests;

    return callback => {
        let result = true;
        tests.map((item) => {
            if (callback(item[0]) !== item[1]) {
                result = false;
            }
        })
        return result;
    }
}

const capLastTestCases = [];
capLastTestCases.push(['hello', 'hellO']);
capLastTestCases.push(['goodbye', 'goodbyE']);
capLastTestCases.push(['howdy', 'howdY']);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = str => str.toUpperCase();
const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();
// console.log(shouldCapitalizeLast(capLastAttempt1)); //-> false
// console.log(shouldCapitalizeLast(capLastAttempt2)); //-> true


const makeHistory = limit => {

}

const myActions = makeHistory(2);
console.log(myActions('jump')); // => should log 'jump done'
console.log(myActions('undo')); // => should log 'jump undone'
console.log(myActions('walk')); // => should log 'walk done'
console.log(myActions('code')); // => should log 'code done'
console.log(myActions('pose')); // => should log 'pose done'
console.log(myActions('undo')); // => should log 'pose undone'
console.log(myActions('undo')); // => should log 'code undone'
console.log(myActions('undo')); // => should log 'nothing to undo'


// CHALLENGE 19
function blackjack(array) {

}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
// const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);

// /*** PLAYER 1 ***/
// const i_like_to_live_dangerously = deal(4, 5);
// console.log(i_like_to_live_dangerously()); // => should log 9
// console.log(i_like_to_live_dangerously()); // => should log 11
// console.log(i_like_to_live_dangerously()); // => should log 17
// console.log(i_like_to_live_dangerously()); // => should log 18
// console.log(i_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
// console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
// const i_TOO_like_to_live_dangerously = deal(2, 2);
// console.log(i_TOO_like_to_live_dangerously()); // => should log 4
// console.log(i_TOO_like_to_live_dangerously()); // => should log 15
// console.log(i_TOO_like_to_live_dangerously()); // => should log 19
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

// /*** PLAYER 3 ***/
// const i_ALSO_like_to_live_dangerously = deal(3, 7);
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
