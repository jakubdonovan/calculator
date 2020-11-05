const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const displayOperationTextElement = document.querySelector('.operation')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')


class Calculator {
    constructor(displayOperationTextElement, previousOperandTextElement, currentOperandTextElement) {
        this.displayOperationTextElement = displayOperationTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
        this.displayOperationTextElement.innerText = ''
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate(){
        let calculation 
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                calculation = previous + current
                break
            case '-':
                calculation = previous - current
                break
            case 'x':
                calculation = previous * current
                break
            case '÷':
                calculation = previous / current
                break
            default:
                return
        }
        this.currentOperand = calculation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        if (this.operation === '÷' && this.currentOperand === '0') {
            this.currentOperandTextElement.style.fontSize = '2rem'
            this.currentOperandTextElement.innerText = `Oops, you can't divide by 0. Clear and try again.`
            calculator.clear()
        }

        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            this.displayOperationTextElement.innerText = this.operation
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(displayOperationTextElement, previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

