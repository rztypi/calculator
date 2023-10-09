const DEFAULT_FIRST_NUMBER = 0;
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
setDisplayText(0);


const numberBtns = document.querySelectorAll(".number-btn");
numberBtns.forEach(btn => btn.addEventListener("click", setNumber));

function setNumber(e) {
    const btnNumber = e.target.textContent;
    if (operator === DEFAULT_OPERATOR) {
        firstNumber = +(firstNumber + btnNumber);

        setDisplayText(firstNumber);

    } else {
        secondNumber = (secondNumber === null) ? +btnNumber : +(secondNumber + btnNumber);

        setDisplayText(secondNumber);
    }
    result = DEFAULT_RESULT;

    writeExpressionText();
}


const operatorBtns = document.querySelectorAll(".operator-btn");
operatorBtns.forEach(btn => btn.addEventListener("click", setOperator));

function setOperator(e) {
    const btnOperator = e.target.textContent;
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
    operator = btnOperator;

    setDisplayText(operator);
    writeExpressionText();
}


const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", (e) => {
    clearAll();
});

function clearAll() {
    firstNumber = DEFAULT_FIRST_NUMBER;
    operator = DEFAULT_OPERATOR;
    secondNumber = DEFAULT_SECOND_NUMBER;
    result = DEFAULT_RESULT;

    setDisplayText(firstNumber);
    writeExpressionText();
}


const equalBtn = document.getElementById("equal-btn");
equalBtn.addEventListener("click", (e) => {
    operate();
});

function operate() {
    if (
        firstNumber !== null
        && operator !== null
        && secondNumber !== null
    ) {
        result = operation[operator](firstNumber, secondNumber);
        setDisplayText(result);
        clearExpression();
    } else {
        console.log("don't operate...")
    }
}

const operation = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
};


function clearExpression() {
    firstNumber = DEFAULT_FIRST_NUMBER;
    operator = DEFAULT_OPERATOR;
    secondNumber = DEFAULT_SECOND_NUMBER;
}