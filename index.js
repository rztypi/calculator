const DEFAULT_FIRST_NUMBER = "0";
const DEFAULT_OPERATOR = null;
const DEFAULT_SECOND_NUMBER = null;
const DEFAULT_RESULT = null;

let firstNumber = DEFAULT_FIRST_NUMBER;
let operator = DEFAULT_OPERATOR;
let secondNumber = DEFAULT_SECOND_NUMBER;
let result = DEFAULT_RESULT;


const expressionText = document.getElementById("expression");
function writeExpressionText() {
    expressionText.textContent = `${firstNumber}`;
    if (operator !== DEFAULT_OPERATOR) {
        expressionText.textContent += ` ${operator}`;
    }
    if (secondNumber !== DEFAULT_SECOND_NUMBER) {
        expressionText.textContent += ` ${secondNumber}`;
    }
}
writeExpressionText();

const displayText = document.getElementById("display");
function setDisplayText(text) {
    displayText.textContent = text;
}
setDisplayText(firstNumber);


const numberBtns = document.querySelectorAll(".number-btn");
numberBtns.forEach(btn => btn.addEventListener("click", (e) => {
    setNumber(e.target.textContent)
}));

function setNumber(number) {
    if (operator === DEFAULT_OPERATOR) {
        firstNumber = (firstNumber === null || firstNumber === "0") ? number : firstNumber + number;

        setDisplayText(firstNumber);

    } else {
        secondNumber = (secondNumber === null || secondNumber === "0") ? number : secondNumber + number;

        setDisplayText(secondNumber);
    }
    result = DEFAULT_RESULT;

    writeExpressionText();
}


const operatorBtns = document.querySelectorAll(".operator-btn");
operatorBtns.forEach(btn => btn.addEventListener("click", (e) => {
    setOperator(e.target.textContent);
}));

function setOperator(op) {
    if (secondNumber !== DEFAULT_SECOND_NUMBER) {
        operate();

        firstNumber = result;
        secondNumber = DEFAULT_SECOND_NUMBER;

        writeExpressionText();

    } else if (result !== DEFAULT_RESULT) {
        firstNumber = result;
        secondNumber = DEFAULT_SECOND_NUMBER;

        writeExpressionText();
    }
    result = DEFAULT_RESULT;
    operator = op;

    setDisplayText(operator);
    writeExpressionText();
}


let firstNumberHasPoint = false;
let secondNumberHasPoint = false;

const pointBtn = document.getElementById("point-btn");
pointBtn.addEventListener("click", () => {
    addPoint();
});

function addPoint() {
    if (secondNumber !== DEFAULT_SECOND_NUMBER && !secondNumberHasPoint) {
        secondNumber += "."
        secondNumberHasPoint = true;
        setDisplayText(secondNumber);
    } else if (operator !== DEFAULT_OPERATOR && !secondNumberHasPoint) {
        secondNumber = "0.";
        secondNumberHasPoint = true;
        setDisplayText(secondNumber);
    } else if (!firstNumberHasPoint) {
        firstNumber += ".";
        firstNumberHasPoint = true;
        setDisplayText(firstNumber);
    }
    writeExpressionText();
}


const delBtn = document.getElementById("del-btn");
delBtn.addEventListener("click", () => {
    deleteText();
});

function deleteText() {
    console.log("in")
    if (result !== DEFAULT_RESULT) {
        clearAll();
        return;
    }
    if (secondNumber !== DEFAULT_SECOND_NUMBER) {
        let charToDelete = secondNumber.charAt(secondNumber.length - 1)
        if (charToDelete === ".") {
            secondNumberHasPoint = false;
        }

        secondNumber = secondNumber.slice(0, secondNumber.length - 1);

        if (secondNumber.length === 0) {
            secondNumber = DEFAULT_SECOND_NUMBER;
            setDisplayText(operator);
        } else {
            setDisplayText(secondNumber);
        }
    } else if (operator !== DEFAULT_OPERATOR) {
        operator = DEFAULT_OPERATOR;
        setDisplayText(firstNumber);
    } else {
        let charToDelete = firstNumber.charAt(firstNumber.length - 1)
        if (charToDelete === ".") {
            firstNumberHasPoint = false;
        }

        firstNumber = firstNumber.slice(0, firstNumber.length - 1)

        if (firstNumber.length === 0) {
            firstNumber = DEFAULT_FIRST_NUMBER;
        }
        setDisplayText(firstNumber);
    }
    writeExpressionText();
}

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
    clearAll();
});

function clearAll() {
    firstNumber = DEFAULT_FIRST_NUMBER;
    operator = DEFAULT_OPERATOR;
    secondNumber = DEFAULT_SECOND_NUMBER;
    result = DEFAULT_RESULT;
    firstNumberHasPoint = false;
    secondNumberHasPoint = false;

    setDisplayText(firstNumber);
    writeExpressionText();
}


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
        result = (Math.round(operation[operator](x, y) * 1000000) / 1000000).toString();
        setDisplayText(result);

        clearExpression();
    }
}

const operation = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "÷": (x, y) => x / y,
    "/": (x, y) => x / y,
};

function clearExpression() {
    firstNumber = DEFAULT_FIRST_NUMBER;
    operator = DEFAULT_OPERATOR;
    secondNumber = DEFAULT_SECOND_NUMBER;
}


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

const btns = document.querySelectorAll("button")
btns.forEach(btn => btn.addEventListener("keydown", (e) => {
    e.preventDefault();
}));