const DEFAULT_FIRST_NUMBER = 0;
const DEFAULT_OPERATOR = null;
const DEFAULT_SECOND_NUMBER = null;
const DEFAULT_RESULT = null;

let firstNumber = DEFAULT_FIRST_NUMBER;
let operator = DEFAULT_OPERATOR;
let secondNumber = DEFAULT_SECOND_NUMBER;
let result = DEFAULT_RESULT;


const numberBtnsDiv = document.getElementById("number-btns");
const numberBtns = numberBtnsDiv.querySelectorAll("button");
numberBtns.forEach(btn => btn.addEventListener("click", setNumber));

function setNumber(e) {
    const btnNumber = e.target.textContent;
    if (operator === null) {
        firstNumber = +(firstNumber + btnNumber);
    } else {
        secondNumber = (secondNumber === null) ? +btnNumber : +(secondNumber + btnNumber);
    }
}

const operatorBtnsDiv = document.getElementById("operator-btns");
const operatorBtns = operatorBtnsDiv.querySelectorAll("button");
operatorBtns.forEach(btn => btn.addEventListener("click", setOperator));

function setOperator(e) {
    const btnOperator = e.target.textContent;
    if (secondNumber !== null) {
        operate()
    }
    operator = btnOperator;
}

const operation = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
};

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate() {
    if (
        firstNumber !== null
        && operator !== null
        && secondNumber !== null
    ) {
        console.log("OPERATE!")
    } else {
        console.log("don't operate...")
    }
}