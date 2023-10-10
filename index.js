const DEFAULT_FIRST_NUMBER = "0";
const DEFAULT_OPERATOR = null;
const DEFAULT_SECOND_NUMBER = null;

let firstNumber = DEFAULT_FIRST_NUMBER;
let firstNumberHasPoint = false;
let operator = DEFAULT_OPERATOR;
let secondNumber = DEFAULT_SECOND_NUMBER;
let secondNumberHasPoint = false;

setExpressionText();
setMainText(firstNumber);


// For setting the text in the display
const expressionText = document.getElementById("expression");
function setExpressionText() {
    expressionText.textContent = `${firstNumber}`;
    if (operator !== DEFAULT_OPERATOR) {
        expressionText.textContent += ` ${operator}`;
    }
    if (secondNumber !== DEFAULT_SECOND_NUMBER) {
        expressionText.textContent += ` ${secondNumber}`;
    }
}

const displayText = document.getElementById("display");
function setMainText(text) {
    displayText.textContent = text;
}


// For setting either the first number or the second number
const numberBtns = document.querySelectorAll(".number-btn");
numberBtns.forEach(btn => btn.addEventListener("click", (e) => {
    setNumber(e.target.textContent)
}));

function setNumber(number) {
    if (operator === DEFAULT_OPERATOR) {
        firstNumber = (firstNumber === null || firstNumber === "0") ? number : firstNumber + number;

        setMainText(firstNumber);

    } else {
        secondNumber = (secondNumber === null || secondNumber === "0") ? number : secondNumber + number;

        setMainText(secondNumber);
    }

    setExpressionText();
}


// For setting the operator
const operatorBtns = document.querySelectorAll(".operator-btn");
operatorBtns.forEach(btn => btn.addEventListener("click", (e) => {
    setOperator(e.target.textContent);
}));

function setOperator(op) {
    if (secondNumber !== DEFAULT_SECOND_NUMBER) {
        operate();

        secondNumber = DEFAULT_SECOND_NUMBER;

        setExpressionText();
    }
    operator = op;

    setMainText(operator);
    setExpressionText();
}


// For adding a decimal point
const pointBtn = document.getElementById("point-btn");
pointBtn.addEventListener("click", () => {
    addPoint();
});

function addPoint() {
    if (secondNumber !== DEFAULT_SECOND_NUMBER && !secondNumberHasPoint) {
        secondNumber += "."
        secondNumberHasPoint = true;
        setMainText(secondNumber);
    } else if (operator !== DEFAULT_OPERATOR && !secondNumberHasPoint) {
        secondNumber = "0.";
        secondNumberHasPoint = true;
        setMainText(secondNumber);
    } else if (!firstNumberHasPoint) {
        firstNumber += ".";
        firstNumberHasPoint = true;
        setMainText(firstNumber);
    }
    setExpressionText();
}


// For deleting/erasing user input
const delBtn = document.getElementById("del-btn");
delBtn.addEventListener("click", () => {
    deleteText();
});

function deleteText() {
    if (secondNumber !== DEFAULT_SECOND_NUMBER) {
        let charToDelete = secondNumber.charAt(secondNumber.length - 1)
        if (charToDelete === ".") {
            secondNumberHasPoint = false;
        }

        secondNumber = secondNumber.slice(0, secondNumber.length - 1);

        if (secondNumber.length === 0) {
            secondNumber = DEFAULT_SECOND_NUMBER;
            setMainText(operator);
        } else {
            setMainText(secondNumber);
        }

    } else if (operator !== DEFAULT_OPERATOR) {
        operator = DEFAULT_OPERATOR;
        setMainText(firstNumber);

    } else {
        let charToDelete = firstNumber.charAt(firstNumber.length - 1)
        if (charToDelete === ".") {
            firstNumberHasPoint = false;
        }

        firstNumber = firstNumber.slice(0, firstNumber.length - 1)

        if (firstNumber.length === 0) {
            firstNumber = DEFAULT_FIRST_NUMBER;
        }
        setMainText(firstNumber);
    }
    setExpressionText();
}


// For clearing all user input
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
    clearAll();
});

function clearAll() {
    firstNumber = DEFAULT_FIRST_NUMBER;
    operator = DEFAULT_OPERATOR;
    secondNumber = DEFAULT_SECOND_NUMBER;
    firstNumberHasPoint = false;
    secondNumberHasPoint = false;

    setMainText(firstNumber);
    setExpressionText();
}


// For operating on the inputted expression
const equalBtn = document.getElementById("equal-btn");
equalBtn.addEventListener("click", () => {
    operate();
});

function operate() {
    if (
        firstNumber !== null
        && operator !== null
        && secondNumber !== null
    ) {
        let x = Number(firstNumber);
        let y = Number(secondNumber);
        firstNumber = (Math.round(operation[operator](x, y) * 1000000) / 1000000).toString();
        setMainText(firstNumber);

        operator = DEFAULT_OPERATOR;
        secondNumber = DEFAULT_SECOND_NUMBER;
    }
}

const operation = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "÷": (x, y) => x / y,
    "/": (x, y) => x / y,
};


// For listening to keyboard input
window.addEventListener("keydown", (e) => {
    if (!Number.isNaN(+e.key)) {
        setNumber(e.key);
    } else if (e.key in operation) {
        setOperator(e.key);
    } else if (e.key === "Enter") {
        operate();
    } else if (e.key === "Backspace") {
        deleteText();
    } else if (e.key === ".") {
        addPoint();
    }
});


// Prevent enter key from interacting with buttons
const btns = document.querySelectorAll("button")
btns.forEach(btn => btn.addEventListener("keydown", (e) => {
    e.preventDefault();
}));