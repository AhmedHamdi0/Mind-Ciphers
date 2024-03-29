import Dialer from "./dialer.js";


document.addEventListener("DOMContentLoaded",function ready(){
    let enterHopsEl = document.getElementById("enter-hop-count");
    let dialpadEl = document.getElementById("dialpad");
    let dialpadKeyEls = dialpadEl.querySelectorAll("button");
    let resultsEl = document.getElementById("results");
    let startingKey1El = document.getElementById("starting-key-1");
    let startingKey2El = document.getElementById("starting-key-2");
    let hopCountEl = document.getElementById("hop-count");
    let pathCountEl = document.getElementById("path-count");
    let countTimingEl = document.getElementById("count-timing");
    let acyclicPathsEl = document.getElementById("acyclic-paths");
    let pathsTimingEl = document.getElementById("paths-timing");

    dialpadEl.addEventListener("mouseover",onHoverKey,false);
    dialpadEl.addEventListener("mouseout",onHoverKey,false);
    dialpadEl.addEventListener("click",onClickKey,false);


    function onHoverKey(evt) {
        let el = evt.target;

        // discover which keys (if any) can be reached from a hovered key
        let reachable = (
            el.matches("button:hover") ?
                Dialer.getReachableKeys(Number(el.value)) :
                []
        );

        for (let keyEl of dialpadKeyEls) {
            if (reachable.includes(Number(keyEl.value))) {
                keyEl.classList.add("highlighted");
            }
            else {
                keyEl.classList.remove("highlighted");
            }
        }
    }

    function onClickKey(evt) {
        let clickedEl = evt.target;

        // clicked on a dialpad key?
        if (clickedEl.matches("#dialpad > button")) {
            let startingKey = Number(clickedEl.value);
            startingKey1El.innerText = startingKey;
            startingKey2El.innerText = startingKey;

            let hopCount = Number(enterHopsEl.value) || 1;
            enterHopsEl.value = hopCount;
            hopCountEl.innerText = hopCount;


            let startTiming = performance.now();
            // count the distinct paths (including cyclic paths)
            let pathCount = Dialer.countPathsTabulation(startingKey,hopCount);
            let endTiming = performance.now();
            printTiming(countTimingEl,Number(endTiming - startTiming) || 0);
            pathCountEl.innerText = pathCount;

            startTiming = performance.now();
            let acyclicPaths = Dialer.listAcyclicPaths(startingKey);
            endTiming = performance.now();
            printTiming(pathsTimingEl,Number(endTiming - startTiming) || 0);
            if (acyclicPaths.length > 0) {
                acyclicPathsEl.innerHTML = "";
                for (let path of acyclicPaths) {
                    let pathEl = document.createElement("div");
                    pathEl.innerHTML = path.join(" &#x27A1; ");
                    acyclicPathsEl.appendChild(pathEl);
                }
            }
            else {
                acyclicPathsEl.innerHTML = "-- none --";
            }

            resultsEl.classList.remove("hidden");
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