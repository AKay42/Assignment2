// Get references to DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btns');
const equalButton = document.getElementById('equal_btn');
const acButton = Array.from(buttons).find(btn => btn.textContent === 'AC');
const cButton = Array.from(buttons).find(btn => btn.textContent === '©');

let currentInput = '';
let previousInput = '';
let currentOperator = null;

// Function to update the display
function updateDisplay() {
  if (currentInput === '') {
    display.value = '0';
  } else {
    display.value = currentInput;
  }
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnText = button.textContent.trim();

    if (!isNaN(btnText) || btnText === '.') {
      // Number or dot
      if (btnText === '.' && currentInput.includes('.')) return; // Prevent multiple dots
      currentInput += btnText;
      updateDisplay();
    } else if (btnText === 'AC') {
      // Clear all
      currentInput = '';
      previousInput = '';
      currentOperator = null;
      updateDisplay();
    } else if (btnText === '©') {
      // Cancel last input (backspace)
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (['+', '-', '×', '÷', '%', '^'].includes(btnText)) {
      // Operator
      if (currentInput === '') return; // Ignore if no number entered
      if (currentOperator !== null) {
        // Chain calculation if needed
        performCalculation();
      }
      previousInput = currentInput;
      currentInput = '';
      // Map operator symbols to actual operators
      switch (btnText) {
        case '×':
          currentOperator = '*';
          break;
        case '÷':
          currentOperator = '/';
          break;
        case '+':
          currentOperator = '+';
          break;
        case '-':
          currentOperator = '-';
          break;
        case '%':
          currentOperator = '%';
          break;
        case '^':
          currentOperator = '^';
          break;
        default:
          currentOperator = null;
      }
    } else if (btnText === '=') {
      // Calculate result
      performCalculation();
    }
  });
});

// Function to perform calculation
function performCalculation() {
  if (currentOperator === null || previousInput === '' || currentInput === '') return;

  let result;
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  switch (currentOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        alert("Can't divide by zero");
        result = '';
      } else {
        result = num1 / num2;
      }
      break;
    case '%':
      result = (num1 * num2) / 100;
      break;
    case '^':
      result = Math.pow(num1, num2);
      break;
    default:
      result = '';
  }
  currentInput = result.toString();
  previousInput = '';
  currentOperator = null;
  updateDisplay();
}

// Initialize display
updateDisplay();