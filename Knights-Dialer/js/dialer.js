export default {
    getReachableKeys,
    countPathsTabulation,
    countPathsMemoization,
    listAcyclicPaths
};

let nearbyKeys = [
    [ 4, 6 ],       // 0
    [ 6, 8 ],       // 1
    [ 7, 9 ],       // 2
    [ 4, 8 ],       // 3
    [ 3, 9, 0 ],    // 4
    [],             // 5
    [ 1, 7, 0 ],    // 6
    [ 2, 6 ],       // 7
    [ 1, 3 ],       // 8
    [ 2, 4 ],       // 9
];

countPathsMemoization = memoize(countPathsMemoization);

// Return which digits a Knight's move can hop to from a given starting digit
function getReachableKeys(startingDigit) {
    return nearbyKeys[startingDigit];
}

// Given the digit to start from and the number of hops to take,
// return a count of all the possible paths that could be traversed

// Implementation with memoization
function countPathsMemoization(startingDigit,hopCount) {
    if (hopCount === 0) return 1;
    let pathCount = 0;

    for (let digit of nearbyKeys[startingDigit]) {
        pathCount += countPaths(digit, hopCount - 1);
    }
    return pathCount;
}

// Count Path With tabulation (Dynamic Programming)
function countPathsTabulation(startingDigit,hopCount) {
    if (hopCount === 0) return 1;

    let priorPathCounts = Array(10).fill(1);
    for (let hops = 0; hops < hopCount; hops++) {
        let pathCounts = Array(10).fill(0);
        for (let digit = 0; digit <= 9; digit++) {
            for (let n of nearbyKeys[digit]) {
                pathCounts[digit] += priorPathCounts[n];
            }
        }
        priorPathCounts = pathCounts;
    }
    return priorPathCounts[startingDigit];
}

// Given the digit to start from, return a list of the distinct acyclic paths that are possible to traverse
function listAcyclicPaths(startingDigit) {
    let paths = [];
    let nextHops = nearbyKeys[startingDigit];

    for (let nextHop of nextHops) {
        let path = [startingDigit, nextHop];
        followPath(path, paths);
    }
    return paths;
}

function followPath(path, paths) {
    let nextHops = nearbyKeys[path[path.length - 1]];
    let pathForwardFound = false;

    for (let nextHop of nextHops) {
        if (!path.includes(nextHop)) {
            pathForwardFound = true;
            let nextPath = [...path, nextHop];
            followPath(nextPath, paths);
        }
    }

    if (!pathForwardFound) {
        paths.push(path);
    }
}

function memoize(fn) {
    let cache = {};
    return function memoized(start, length) {
        if (!cache[`${start}:${length}`]) {
            cache[`${start}:${length}`] = fn(start, length);
        }
        return cache[`${start}:${length}`];
    }
}


let dialpad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [ , 0,  ]
];

// Just Ugly Code
function ReachableKeys(startingDigit) {
    let nearbyKeys = [];
    for (let [rowIndex, row] of dialpad.entries()) {
        let colIndex = row.indexOf(startingDigit);
        if (colIndex !== -1) {
            for (let rowMove of [-2, -1, 1, 2]) {
                for (let colMove of [-2, -1, 1, 2]) {
                    if (Math.abs(rowMove) !== Math.abs(colMove)) {
                        if (
                            rowIndex + rowMove >= 0 && rowIndex + rowMove <= 3 &&
                            colIndex + colMove >= 0 && colIndex + colMove <= 2 &&
                            dialpad[rowIndex+rowMove][colIndex+colMove] !== undefined
                        ) {
                            nearbyKeys.push(dialpad[rowIndex+rowMove][colIndex+colMove]);
                        }
                    }
                }
            }
        }
    }
    return nearbyKeys;
}
