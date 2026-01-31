const display = document.getElementById('display');
        const miniDisplay = document.getElementById('mini-display');
        
        let currentInput = '0';
        let previousInput = '';
        let operation = null;
        let shouldResetScreen = false;
        
        function updateDisplay() {
    display.textContent = currentInput;

    if (operation !== null && !shouldResetScreen) {
        miniDisplay.textContent = previousInput + " " + operation;
    }
}

        
        function resetScreen() {
            currentInput = '0';
            shouldResetScreen = false;
            updateDisplay();
        }
        
        function clearAll() {
            currentInput = '0';
            previousInput = '';
            operation = null;
            shouldResetScreen = false;
            updateDisplay();
        }
        
        function appendNumber(number) {
            if (shouldResetScreen) {
                currentInput = '';
                shouldResetScreen = false;
            }
            
            if (currentInput === '0' && number !== '.') {
                currentInput = number;
            } else if (number === '.' && !currentInput.includes('.')) {
                currentInput += number;
            } else if (number !== '.') {
                currentInput += number;
            }
            
            updateDisplay();
        }
        
       function setOperation(op) {
    if (operation !== null) calculate();

    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;

    miniDisplay.textContent = previousInput + " " + operation;
}

        
    function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        default: return;
    }

    currentInput = String(result);
    operation = null;
    previousInput = '';
    shouldResetScreen = true;

    display.textContent = currentInput;
    miniDisplay.textContent = '';
}

        function backspace() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        
        function toggleSign() {
            currentInput = String(parseFloat(currentInput) * -1);
            updateDisplay();
        }
        
        // Event listeners for number buttons
        document.getElementById('0').addEventListener('click', () => appendNumber('0'));
        document.getElementById('1').addEventListener('click', () => appendNumber('1'));
        document.getElementById('2').addEventListener('click', () => appendNumber('2'));
        document.getElementById('3').addEventListener('click', () => appendNumber('3'));
        document.getElementById('4').addEventListener('click', () => appendNumber('4'));
        document.getElementById('5').addEventListener('click', () => appendNumber('5'));
        document.getElementById('6').addEventListener('click', () => appendNumber('6'));
        document.getElementById('7').addEventListener('click', () => appendNumber('7'));
        document.getElementById('8').addEventListener('click', () => appendNumber('8'));
        document.getElementById('9').addEventListener('click', () => appendNumber('9'));
        document.getElementById('decimal').addEventListener('click', () => appendNumber('.'));
        
        // Event listeners for operator buttons
        document.getElementById('add').addEventListener('click', () => setOperation('+'));
        document.getElementById('subtract').addEventListener('click', () => setOperation('-'));
        document.getElementById('multiply').addEventListener('click', () => setOperation('*'));
        document.getElementById('divide').addEventListener('click', () => setOperation('/'));
        document.getElementById('equals').addEventListener('click', calculate);
        
        // Event listeners for function buttons
        document.getElementById('ce').addEventListener('click', resetScreen);
        document.getElementById('c').addEventListener('click', clearAll);
        document.getElementById('backspace').addEventListener('click', backspace);
        document.getElementById('plusminus').addEventListener('click', toggleSign);
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            else if (e.key === '.') appendNumber('.');
            else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                setOperation(e.key);
            }
            else if (e.key === 'Enter' || e.key === '=') calculate();
            else if (e.key === 'Escape') clearAll();
            else if (e.key === 'Backspace') backspace();
        });