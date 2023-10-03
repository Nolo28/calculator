let parentOfButtons = document.querySelector(".container");
let screen = document.querySelector(".p-class p");
let evaluation = "";
let currentNum = "";
let numOfSigns = [];
let prevSign = false; //checks to see if previous value was a sign to it can format correctly

function checkValue(e) {
  let btn = e.target.dataset.num;
  let calcSign = false;
  if ((btn == "-") | (btn == "+") | (btn == "*") | (btn == "/")) {
    if (screen.innerText === "0") {
      return clear(); //checks if user hits operation sign without inputting any numbers
    }
    calcSign = true;
    numOfSigns.push(btn);
    numOfSigns.length > 1 ? calculateEarly(btn) : changeScreen(btn, calcSign);
  } else if (btn === "C") {
    clear();
  } else if (btn === "=") {
    evaluation += currentNum; // adds the last number or numbers to the evaulation variable
    currentNum = ""; // resets currentNum since we just need the values in evaluation variable
    calculate();
  } else if (btn !== undefined) {
    currentNum += btn;
    changeScreen(btn, calcSign);
  }
}

function changeScreen(btn, calcSign) {
  if (screen.innerText === "0") {
    screen.innerText = btn;
  } else if (calcSign) {
    screen.innerText += " " + btn;
    prevSign = true;
    evaluation += currentNum; // adds the numbers to evaluation variable since we received a sign
    evaluation += btn; // adds the sign to the evaluation string strictly after since we need to add the numbers first
    currentNum = ""; //resets currentNums value
  } else {
    prevSign
      ? ((screen.innerText += " " + btn), (prevSign = false))
      : (screen.innerText += btn);
  }
}

function calculateEarly(btn) {
  evaluation += currentNum;
  evaluation = eval(evaluation);
  numOfSigns = [btn];
  currentNum = "";
  prevSign = true; // sets prevSign to true since we received a sign last
  screen.innerText = evaluation + " " + btn;
  evaluation = evaluation + btn; // adding the sign to the end of the evaluation string
}

function calculate() {
  evaluation = eval(evaluation);
  screen.innerText = evaluation;
}

function clear() {
  evaluation = "";
  currentNum = "";
  prevSign = false;
  screen.innerText = 0;
}

parentOfButtons.addEventListener("click", checkValue);
