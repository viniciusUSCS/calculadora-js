const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    //adiciona digito a calculadora
    addDigit(digit) {
        //checar se a operação ja contem um .
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

// Todos os processos da calculadora
processOperation(operation) {    
    // Checa se o valor current está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
        // Mudar de operação
        if(this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
        }
        return
    }

    // Pega o valor atual e a prévia do valor
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
        case "+":
          operationValue = previous + current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "-":
          operationValue = previous - current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "*":
          operationValue = previous * current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "/":
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "DEL":
          this.processDelOperator();
          break;
        case "CE":
          this.processClearCurrentOperator();
          break;
        case "C":
          this.processClearOperator();
          break;
        case "=":
          this.processEqualOperator();
          break;
        default:
          return;
      }
    }

    // selecionar valores da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        previous = null,
        current = null
        ) {   
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checar se o valor é zero, se for vai ser igual o current
            if (previous === 0) {
                operationValue = current;
            }

            //adiciona valor ao previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    //Selecionar função matematica
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"]

        if (!mathOperations.includes(operation)) {
            return;
        }
        
        this.previousOperationText.innerText =
         this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //deleta o ultimo digito
    processDelOperation() {
        this.currentOperationText.innerText =
         this.currentOperationText.innerText.slice(0, -1);
    }

    //apaga a operação atual
    processClearCurrentOperation () {
        this.currentOperationText.innerText = "";
    }
    //limpa todas as operações
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
      }
    //gera o resultado  
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];
    
        this.processOperation(operation);
      }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach ((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})