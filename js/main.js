var mainKeys = []; //array to store current key presses
var mainValue = 0; //store global running value of calc operations
var lastOperator = ""; //save last arithmetic operator used before equals key is pressed
var $calcScreen = $(".calc-screen").children("p"); //save jQuery slector for screen element

//update calculator screen to most current key press
function updateCalcScreen() {
  $calcScreen.text(reduceKeys());
};

//combines all elements of mainKeys array into a string e.g. [1, 2, ., 8] becomes 12.8
function reduceKeys() {
  return mainKeys.reduce(function(a, b){
  	return a + b;
  });
}

//delete values from mainKeys array
function clearKeys() {
  mainKeys = [];
}

//delete value of mainValue variable
function clearValue() {
  mainValue = 0;
}

//clear calculator screen
function clearCalcScreen() {
  $calcScreen.text("");
};

//AC key click event sets mainKeys and mainValue to empty and clears screen
$(".button-ac").click(function(){
  clearKeys();
  clearValue();
  clearCalcScreen();
});

//CE key click delete last element of array and clears screen
$(".button-ce").click(function(){
  mainKeys = mainKeys.slice(0, mainKeys.length-1);
  clearCalcScreen(); //clear screen in case mainKeys array is empty
  updateCalcScreen();
});

//num key click pushes corresponding number into mainKeys array and updates screen to current num
$(".button-num").click(function(){
	mainKeys.push($(this).children('p').text());
  updateCalcScreen();
});

$(".button-add").click(function(){
  if (mainValue === 0) {
    mainValue = parseFloat(reduceKeys()); //parseFloat turns string returned by reduceKeys() into float value
  } else {
    mainValue += parseFloat(reduceKeys());
  }
  clearKeys();
  lastOperator = "+";
});

$(".button-minus").click(function(){
  if (mainValue === 0) {
    mainValue = parseFloat(reduceKeys());
  } else {
    mainValue -= parseFloat(reduceKeys());
  }
  clearKeys();
  lastOperator = "-";
});

$(".button-multiply").click(function(){
  if (mainValue === 0) {
    mainValue = parseFloat(reduceKeys());
  } else {
    mainValue *= parseFloat(reduceKeys());
  }
  clearKeys();
  lastOperator = "X";
});

$(".button-divide").click(function(){
  if (mainValue === 0) {
    mainValue = parseFloat(reduceKeys());
  } else {
    mainValue /= parseFloat(reduceKeys());
  }
  clearKeys();
  lastOperator = "/";
});

$(".button-percent").click(function(){
	mainValue = parseFloat(reduceKeys());
  clearKeys();
  lastOperator = "%";
});

//use lastOperator variable to execute appropriate switch case
$(".button-equal").click(function(){
  switch (lastOperator) {
    case "+":
      mainValue += parseFloat(reduceKeys());
      clearKeys();
      $calcScreen.text(mainValue);
      break;
    case "-":
      mainValue -= reduceKeys();
      clearKeys();
      $calcScreen.text(mainValue);
      break;
    case "X":
      mainValue *= reduceKeys();
      clearKeys();
      $calcScreen.text(mainValue);
      break;
    case "/":
      mainValue /= reduceKeys();
      clearKeys();
      $calcScreen.text(mainValue.toFixed(2));
      break;
    case "%":
      mainValue = (parseFloat(reduceKeys()) / mainValue);
      clearKeys();
      $calcScreen.text(mainValue.toFixed(2));
      break;
    default:
      $calcScreen.text(reduceKeys());
  }
  lastOperator = ""; //reset lastOperator global variable for next equation
});