import { Calculator } from './Calculator.js';
import { ThemeManager } from './ThemeManager.js';
import { HistoryManager } from './HistoryManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate Core Modules
    const calc = new Calculator();
    const themeManager = new ThemeManager('theme-toggle');
    const historyManager = new HistoryManager('tooltip-list', 'modal-history-list');

    // DOM References
    const mainDisplay = document.getElementById('main-display');
    const expressionDisplay = document.getElementById('expression-display');
    const historyBtn = document.getElementById('history-btn');
    const historyModal = document.getElementById('history-modal');
    const closeModal = document.getElementById('close-modal');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Render Display UI
    const updateDisplay = () => {
        mainDisplay.textContent = calc.currentOperand;
        expressionDisplay.textContent = calc.operation != null 
            ? `${calc.previousOperand} ${calc.operation}` 
            : '';
    };

    // Callback when selecting an item from the history modal
    const handleHistorySelect = (resultValue) => {
        calc.currentOperand = resultValue;
        calc.isEvaluated = true;
        updateDisplay();
        historyModal.classList.remove('open');
    };

    // Render initial history state
    historyManager.render(handleHistorySelect);

    // Click Input Delegation
    document.querySelector('.keypad').addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        target.classList.add('btn-active-key');
        setTimeout(() => target.classList.remove('btn-active-key'), 150);

        const { number, operator, action } = target.dataset;

        if (number !== undefined) calc.appendNumber(number);
        if (operator !== undefined) calc.chooseOperation(operator);

        if (action === 'all-clear') calc.clearAll();
        if (action === 'clear') calc.clearEntry();
        if (action === 'backspace') calc.deleteDigit();
        if (action === 'calculate') {
            const record = calc.compute();
            if (record) {
                historyManager.addRecord(record);
                historyManager.render(handleHistorySelect);
            }
        }

        updateDisplay();
    });

    // Keyboard Integration
    window.addEventListener('keydown', (e) => {
        const key = e.key;

        if (!isNaN(key) || key === '.') calc.appendNumber(key);
        if (['+', '-', '*', '/'].includes(key)) {
            const opMap = { '*': '×', '/': '÷' };
            calc.chooseOperation(opMap[key] || key);
        }
        if (key === 'Enter' || key === '=') {
            e.preventDefault();
            const record = calc.compute();
            if (record) {
                historyManager.addRecord(record);
                historyManager.render(handleHistorySelect);
            }
        }
        if (key === 'Backspace') calc.deleteDigit();
        if (key === 'Escape') calc.clearAll();

        updateDisplay();
    });

    // Modal Control Logic
    historyBtn.addEventListener('click', () => {
        historyManager.render(handleHistorySelect);
        historyModal.classList.add('open');
    });

    closeModal.addEventListener('click', () => historyModal.classList.remove('open'));
    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) historyModal.classList.remove('open');
    });

    clearHistoryBtn.addEventListener('click', () => {
        historyManager.clearHistory();
    });

    // Initial render call
    updateDisplay();
});