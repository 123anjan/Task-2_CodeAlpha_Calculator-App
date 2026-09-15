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

}














