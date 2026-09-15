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
}














