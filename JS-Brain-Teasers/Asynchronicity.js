// Asynchronicity
// Uncomment the lines after each function to check your work

const sayHowdy = () => console.log("Howdy");

const testMe = () => {
    setTimeout(sayHowdy, 0);
    console.log("Partnah");
}
// testMe(); // what order should these log out? Howdy or Partnah first?


const delayedGreet = () => {
    setTimeout(() => console.log('welcome'), 3000);
}
// delayedGreet(); // should log (after 3 seconds): welcome


const helloGoodbye = () => {
    console.log('hello');
    setTimeout(() => console.log('goodbye'), 2000);
}
// helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye


const brokenRecord = () => {
    setInterval(() => console.log('hi again'), 1000);
}
// brokenRecord(); // should log (every second): hi again


const limitedRepeat = () => {
    let count = 0;
    let intervalId = setInterval(() => {
        console.log('hi for now');
        count++;
        if (count >= 5) {
            clearInterval(intervalId);
        }
    }, 1000)
}
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now


const everyXsecsForYsecs = (func, interval, duration) => {
    let currentDuration = 0;
    let intervalId = setInterval(() => {
        func();
        currentDuration += duration;
        if (currentDuration >= duration) {
            clearInterval(intervalId)
        }
    }, interval)
}
const theEnd = () => console.log('This is the end!');
// everyXsecsForYsecs(theEnd, 2, 20); 
// should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!


const delayCounter = (target, wait) => {
    let current = 1;
    return () => {
        let intervalId = setInterval(() => {
            if (current <= target) {
                console.log(current)
                current++;
            } else {
                clearInterval(intervalId)
            }
        }, wait)
    }
}
const countLogger = delayCounter(3, 1000)
// countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3


const promised = value => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value)
        }, 2000);
    })
    return promise;
}

const createPromise = promised('wait for it...');
// createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds


class SecondClock {
    constructor(cb) {
        // ADD CODE HERE
    }
    // ADD METHODS HERE
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const clock = new SecondClock((val) => { console.log(val) });
// console.log("Started Clock.");
// clock.start();
// setTimeout(() => {
//     clock.reset();
//     console.log("Stopped Clock after 6 seconds.");
// }, 6000);

/* CHALLENGE 10 */

function debounce(callback, interval) {
    // ADD CODE HERE
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// function giveHi() { return 'hi'; }
// const giveHiSometimes = debounce(giveHi, 3000);
// console.log(giveHiSometimes()); // -> 'hi'
// setTimeout(function() { console.log(giveHiSometimes()); }, 2000); // -> undefined
// setTimeout(function() { console.log(giveHiSometimes()); }, 4000); // -> undefined
// setTimeout(function() { console.log(giveHiSometimes()); }, 8000); // -> 'hi'
