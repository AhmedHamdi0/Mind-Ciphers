// Higher Order Functions and Callbacks
// Uncomment the lines after each function to check your work

console.log('Hello, world!');

const addTwo = num => num + 2;

// console.log(addTwo(3));
// console.log(addTwo(10));


const addS = word => word + "S";

// console.log(addS('pizza'));
// console.log(addS('bagel'));


const map = (array, callback) => {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(callback(array[i]));
    }
    return output;
}

// console.log(map([1, 2, 3], addTwo));


const forEach = (array, callback) => {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(callback(array[i]));
    }
}

let alphabet = '';
const letters = ['a', 'b', 'c', 'd'];
forEach(letters, function (char) {
    alphabet += char;
});
// console.log(alphabet); //-> abcd


const mapWith = (array, callback) => {
    return forEach(array, callback);
}


const reduce = (array, callback, initialValue) => {
    for (let i = 0; i < array.length; i++) {
        initialValue = callback(array[i], initialValue);
    }
    return initialValue;
}

const nums = [4, 1, 3];
const add = (a, b) => a + b;
// console.log(reduce(nums, add, 0))  //-> 8


const intersection = (arrays) => {
    return arrays.reduce((acc, curr) => {
        return curr.filter(el => acc.includes(el));
    });
}

// console.log(intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]])); //-> [15, 5]


const union = (arrays) => {
    return arrays.reduce((acc, curr) => {
        const elements = curr.filter(el => !acc.includes(el));
        return acc.concat(elements);
    });
}

// console.log(union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]]));
//-> [5, 10, 15, 88, 1, 7, 100]


const objOfMatches = (array1, array2, callback) => {
    const matchObject = {};
    for (let i = 0; i < array1.length; i++) {
        if (callback(array1[i]) === array2[i]) {
            matchObject[array1[i]] = array2[i];
        }
    }
    return matchObject;
}

// console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'],
//     function (str) { return str.toUpperCase(); }));
//-> { hi: 'HI', bye: 'BYE', later: 'LATER' }


const multiMap = (arrVals, arrCallbacks) => {
    const obj = {};
    for (let i = 0; i < arrVals.length; i++) {
        obj[arrVals[i]] = [];
        for (let j = 0; j < arrCallbacks.length; j++) {
            obj[arrVals[i]].push(arrCallbacks[j](arrVals[i]));
        }
    }
    return obj;
}

// console.log(multiMap(['catfood', 'glue', 'beer'], [(str) => { return str.toUpperCase(); }, (str) => { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, (str) => { return str + str; }]));
//-> { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


const objectFilter = (obj, callback) => {
    const newObj = {};
    for (let key in obj) {
        if (obj[key] === callback(key)) {
            newObj[key] = callback(key);
        }
    }
    return newObj;
}

const cities = {
London: 'LONDON',
LA: 'Los Angeles',
Paris: 'PARIS',
};
// console.log(objectFilter(cities, city => city.toUpperCase())) //-> { London: 'LONDON', Paris: 'PARIS'}


const majority = (array, callback) => {
    let countTrue = 0;
    let countFalse = 0;
    for (let i = 0; i < array.length; i++) {
        callback(array[i]) ? countTrue++ : countFalse++;
    }
    return countTrue > countFalse;
}

const isOdd = num => num % 2 === 1;
// console.log(majority([1, 2, 3, 4, 5], isOdd)); //-> true
// console.log(majority([2, 3, 4, 5], isOdd)); //-> false


function prioritize(array, callback) {
    const trueArray = [];
    const falseArray = [];
    for (let i = 0; i < array.length; i++) {
        const value = callback(array[i]);
        value ? trueArray.push(array[i]) : falseArray.push(array[i]);
    }
    return [...trueArray, ...falseArray];
}

const startsWithS = (str) => { return str[0] === 's' || str[0] === 'S'; };
// console.log(prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS));
//-> ['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends']


const countBy = (array, callback) => {
    let result = {};
    let odd = 0;
    let even = 0;
    for (let num of array) {
        let key = callback(num);
        key === "odd" ? (result[key] = ++odd) : (result[key] = ++even);
    }
    return result;
}

// console.log(countBy([1, 2, 3, 4, 5], (num) => {
// if (num % 2 === 0) return 'even';
// else return 'odd';
// })); //-> { odd: 3, even: 2 }


const groupBy = (array, callback) => {
    const result = {};
    for (let i of array) {
        let decimal = callback(i);
        if (decimal in result) {
            result[decimal].push(i);
        } else {
            result[decimal] = [i];
        }
    }
    return result;
}

const decimals = [1.3, 2.1, 2.4];
const floored = num => Math.floor(num);
// console.log(groupBy(decimals, floored)); //-> { 1: [1.3], 2: [2.1, 2.4] }


const goodKeys = (obj, callback) => {
    const result = [];
    for (let key in obj) {
        if (callback(obj[key])) {
            result.push(key);
        }
    }
    return result;
}

const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' };
const startsWithBird = str => str.slice(0, 4).toLowerCase() === 'bird';
// console.log(goodKeys(sunny, startsWithBird)); //->  ['charlie', 'dee']


const commutative = (func1, func2, value) => {
    return func2(func1(value)) === func1(func2(value));
}

const multBy3 = n => n * 3;
const divBy4 = n => n / 4;
const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); //-> true
// console.log(commutative(multBy3, subtract5, 10)); //-> false
// console.log(commutative(divBy4, subtract5, 48)); //-> false


const objFilter = (obj, callback) => {
    const result = {};
    for (let key in obj) {
        if (obj[key] === callback(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = n => n / 2;
// console.log(objFilter(startingObj, half)); //-> { 2: 1, 6: 3 }


const rating = (arrOfFuncs, value) => {
    let trueCount = 0;
    for (let func of arrOfFuncs) {
        if (func(value)) {
            trueCount++;
        }
    }
    return (trueCount / arrOfFuncs.length) * 100;
}

const isEven = n => n % 2 === 0;
const greaterThanFour = n => n > 4;
const isSquare = n => Math.sqrt(n) % 1 === 0;
const hasSix = n => n.toString().includes('6');
const checks = [isEven, greaterThanFour, isSquare, hasSix];
// console.log(rating(checks, 64)); //-> 100
// console.log(rating(checks, 66)); //-> 75


const pipe = (arrOfFuncs, value) => {
    let result = value;
    for (let func of arrOfFuncs) {
        result = func(result);
    }
    return result;
}

const capitalize = str => str.toUpperCase();
const addLowerCase = str => str + str.toLowerCase();
const repeat = str => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
// console.log(pipe(capAddlowRepeat, 'cat')); //-> 'CATcatCATcat'


const highestFunc = (objOfFuncs, subject) => {
    let highestKey = null;
    let highestResult = -Infinity;

    for (let key of Object.keys(objOfFuncs)) {
        let result = objOfFuncs[key](subject);

        if (result > highestResult) {
            highestKey = key;
            highestResult = result;
        }
    }
    return highestKey;
}


const groupOfFuncs = {};
groupOfFuncs.double = n => n * 2;
groupOfFuncs.addTen = n => n + 10;
groupOfFuncs.inverse = n => n * -1;
// console.log(highestFunc(groupOfFuncs, 5)); //-> 'addTen'
// console.log(highestFunc(groupOfFuncs, 11)); //-> 'double'
// console.log(highestFunc(groupOfFuncs, -20)); //-> 'inverse'


const combineOperations = (startVal, arrOfFuncs) => {
    return pipe(arrOfFuncs, startVal);
}

const add100 = num => num + 100;

const divByFive = num => num / 5;

const multiplyByThree = num => num * 3;

const multiplyFive = num => num * 5;

const addTen = num => num + 10;

// console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); //-> 60
// console.log(combineOperations(0, [divByFive, multiplyFive, addTen])); //-> 10


const myFunc = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) return 1;
    }
    return -1;
}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

// const isOdd = num => (num % 2 !== 0);
// console.log(myFunc(numbers, isOdd)); //-> 1
// console.log(myFunc(evens, isOdd)); //-> -1


const myForEach = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}

let sum = 0;
const addToSum = num => sum += num;

// const nums = [1, 2, 3];
// myForEach(nums, addToSum);
// console.log(sum); //-> 6
