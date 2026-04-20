
let display = document.getElementById("display");
let isDeg = true; 

/* INPUT */
function appendValue(value) {
    let lastChar = display.value.slice(-1);

    if (display.value === "" && "+*/".includes(value)) return;

    if ("+-*/".includes(lastChar) && "+-*/".includes(value)) return;

    let parts = display.value.split(/[\+\-\*\/]/);
    let lastNumber = parts[parts.length - 1];

    if (value === "." && lastNumber.includes(".")) return;

    display.value += value;
}

/* DEG / RAD toggle */
function toggleDegRad() {
    isDeg = !isDeg;
    alert(isDeg ? "DEG Mode" : "RAD Mode");
}

/* CLEAR */
function clearDisplay() {
    display.value = "";
}

/* DELETE */
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/* FACTORIAL */
function factorial() {
    try {
        let num = Number(display.value);
        if (num < 0) {
            display.value = "Error";
            return;
        }

        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

/* TRIG (DEG / RAD SUPPORT) */
function sin(x) {
    return Math.sin(isDeg ? x * Math.PI / 180 : x);
}

function cos(x) {
    return Math.cos(isDeg ? x * Math.PI / 180 : x);
}

function tan(x) {
    return Math.tan(isDeg ? x * Math.PI / 180 : x);
}

/* CALCULATE */
function calculate() {
    try {
       if (!display || display.value.trim() === "") return;

        let result = Function('"use strict";return (' + display.value + ')')();

        if (!isFinite(result)) {
            display.value = "Error";
        } else {
            addToHistory(display.value + " = " + result);
            display.value = result;
            localStorage.setItem("lastResult", result);
        }
    } catch {
        display.value = "Error";
    }
}

/* SQRT */
function squareRoot() {
    display.value = Math.sqrt(display.value);
}

/* HISTORY */
function addToHistory(text) {
    let panel = document.getElementById("historyPanel");

    if (!panel) return;

    let p = document.createElement("p");
    p.innerText = text;
    panel.prepend(p);
}

function toggleHistory() {
    let panel = document.getElementById("historyPanel");
    if (panel) {
        panel.classList.toggle("hidden");
    }
}

/* THEME */
function toggleTheme() {
    document.body.classList.toggle("light");
}

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) appendValue(e.key);

    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});