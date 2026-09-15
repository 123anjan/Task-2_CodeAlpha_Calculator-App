/* Calculator Class - Handles mathematical state & operations.*/
/*--- export class Calculator ---*/

export class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.isEvaluated = false;
    }

    clearAll() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.isEvaluated = false;
    }

    clearEntry() {
        this.currentOperand = '0';
    }

    deleteDigit() {
        if (this.isEvaluated) {
            this.clearAll();
            return;
        }
        if (this.currentOperand.length === 1 || this.currentOperand === '0') {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.isEvaluated) {
            this.currentOperand = number === '.' ? '0.' : number;
            this.isEvaluated = false;
            return;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }
chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand === '') return;

        if (this.previousOperand !== '' && !this.isEvaluated) {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.isEvaluated = false;
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return null;

        switch (this.operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '×': 
            case '*': result = prev * current; break;
            case '÷': 
            case '/': 
                result = current === 0 ? 'Error' : prev / current;
                break;
            default: return null;
        }

        const formattedResult = typeof result === 'number' 
            ? (Math.round(result * 1e8) / 1e8).toString()
            : result;

        const record = {
            expression: `${this.previousOperand} ${this.operation} ${this.currentOperand}`,
            result: formattedResult
        };

        this.currentOperand = formattedResult;
        this.operation = null;
        this.previousOperand = '';
        this.isEvaluated = true;

        return record;
    }
}














