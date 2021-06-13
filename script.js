class twentyFourGame {
    constructor() {
        this.dummyOperand = document.querySelector('[dummy]')
        this.dummyOperation = document.querySelector('[dummy]')
        this.newNumbers()
    }

    clear() {
        this.firstOperand = this.dummyOperand
        this.secondOperand = this.dummyOperand
        this.activeOperation = this.dummyOperation
    }

    newNumbers() {
        this.clear()
        this.randomizeNumbers()
        this.populateNumbers()
    }

    randomizeNumbers() {
        let base = 24
        answerArray.splice(0, answerArray.length)
        for (let i = 0; i < 3; i++) {
            let operation = Math.floor((Math.random() * 6)) % 4
            let nextNumber = Math.floor((Math.random() * 10)) + 2
            if (operation === 3) {
                if ((base + nextNumber) > 24) {
                    i--
                    continue
                }
                answerArray.push(nextNumber)
                answerArray.push(' − ')
                base = base + nextNumber
            } else if (operation === 2) {
                if ((base - nextNumber) < 1) {
                    i--
                    continue
                }
                answerArray.push(nextNumber)
                answerArray.push(' + ')
                base = base - nextNumber
            } else if (operation === 1) {
                if ((base * nextNumber) > 32) {
                    i--
                    continue
                }
                answerArray.push(nextNumber)
                answerArray.push(' ÷ ')
                base = base * nextNumber
            } else {
                if (base % nextNumber !== 0) {
                    i--
                    continue
                }
                answerArray.push(nextNumber)
                answerArray.push(' × ')
                base = base / nextNumber
            }
            operationsArray[i] = operationLib[operation]
        }
        if (base > 16) {
            this.randomizeNumbers()
        } else {
            answerArray.push(base)
            answerArray.reverse()
        }
    }

    populateNumbers() {
        let randomOrder = Math.floor(Math.random() * 4)
        numberButtonElements.forEach((number, index) => {
            number.innerText = `${answerArray[2*((randomOrder + index) % 4)]}`
            number.classList.remove('empty')
            number.classList.remove('selected')
            number.style.fontSize = `calc(var(--card-height) / (${answerArray[2*((randomOrder + index) % 4)].toString().length} + 3.5)`
        })
    }

    chooseOperation(operation) {
        if (this.activeOperation === operation) {
            this.activeOperation.classList.remove('selected')
            this.activeOperation = this.dummyOperation
            return
        } else {
            this.activeOperation.classList.remove('selected')
            this.activeOperation = operation
            this.activeOperation.classList.add('selected')
        }
    }

    chooseNumber(number) {
        if (this.firstOperand === number) {
            this.firstOperand.classList.remove('selected')
            this.firstOperand = this.dummyOperand
            return
        } else if (this.secondOperand === number) {  
            this.secondOperand.classList.remove('selected')
            this.secondOperand = this.dummyOperand
            return
        } else if (this.firstOperand !== this.dummyOperation) {
            this.secondOperand.classList.remove('selected')
            this.secondOperand = number
            this.secondOperand.classList.add('selected')
        } else {
            this.firstOperand.classList.remove('selected')
            this.firstOperand = number
            this.firstOperand.classList.add('selected')
        }
    }

    compute() {
        if (this.firstOperand === this.dummyOperand || this.secondOperand === this.dummyOperand || this.activeOperation === this.dummyOperation){
            return
        }
        let computation
        const first = parseInt(this.firstOperand.innerText)
        const second = parseInt(this.secondOperand.innerText)
        textBoxElement.classList.add('hidden')
        textBoxElement.innerText = ''
        switch (this.activeOperation.innerText) {
            case '+':
                computation = first + second
                break
            case '−':
                computation = Math.abs(first - second)
                break
            case '×':
                computation = first * second
                break
            case '÷':
                if (first % second === 0) {
                    computation = first / second
                } else if (second % first === 0) {
                    computation = second / first
                } else {
                    this.firstOperand.classList.remove('selected')
                    this.secondOperand.classList.remove('selected')
                    this.activeOperation.classList.remove('selected')
                    textBoxElement.innerText = 'The quotient is not a whole number'
                    textBoxElement.classList.remove('hidden')
                    this.clear()
                    return
                }
                break
            default:
                this.clear()
                return
        }
        this.firstOperand.innerText = ''
        this.firstOperand.classList.add('empty')
        this.secondOperand.innerText = `${computation}`
        this.secondOperand.style.fontSize = `calc(var(--card-height) / (${computation.toString().length} + 3.5)`
        this.secondOperand.classList.remove('selected')
        this.activeOperation.classList.remove('selected')
        this.clear()
        this.victory()
    }

    victory() {
        let victoryCount = 0
        numberButtonElements.forEach(number => {
            if (number.innerText === '' || number.innerText === '24') victoryCount++ 
        })
        if (victoryCount === 4) {
            checkBoxElement.classList.toggle('hidden')
        }
    }
}

const operationButtonElements = document.querySelectorAll('[operationButton]')
const numberButtonElements = document.querySelectorAll('[numberButton]')
const answerButtonElement = document.querySelector('[answerButton]')
const hintButtonElement = document.querySelector('[hintButton]')
const rulesButtonElement = document.querySelector('[rulesButton]')
const resetButtonElement = document.querySelector('[resetButton]')
const textBoxElement = document.querySelector('[textBox]')
const checkBoxElement = document.querySelector('[checkBox]')
const operationLib = ['Multiplication', 'Division', 'Addition', 'Subtraction']
const operationsArray = [], answerArray = []

const newGame = new twentyFourGame()

let operationSymbols = '+−×÷'
operationButtonElements.forEach((operation,index) => {
    operation.innerText = `${operationSymbols[index]}`
    operation.addEventListener('click', () => {
        newGame.chooseOperation(operation)
        newGame.compute()
    })
})

numberButtonElements.forEach(number => {
    number.addEventListener('click', () => {
        newGame.chooseNumber(number)
        newGame.compute()
    })
})

answerButtonElement.innerText = 'Answer'
answerButtonElement.addEventListener('click', () => {
    let answerText = ''
    answerArray.forEach(index => {
        answerText += `${index}`
    })
    if (textBoxElement.innerText === answerText) {
        textBoxElement.classList.add('hidden')
        textBoxElement.innerText = ''
    } else {
        textBoxElement.innerText = answerText
        textBoxElement.classList.remove('hidden')
    }
})

hintButtonElement.innerText = 'Hints'
hintButtonElement.addEventListener('click', () => {
    let hintText = ''
    operationsArray.forEach(element => {
        hintText += `${element} ` 
    })
    hintText = hintText.slice(0,-1)
    if (textBoxElement.innerText === hintText) {
        textBoxElement.classList.add('hidden')
        textBoxElement.innerText = ''
    } else {
        textBoxElement.innerText = hintText
        textBoxElement.classList.remove('hidden')
    }
})

rulesButtonElement.innerText = 'Rules'
rulesButtonElement.addEventListener('click', () => {
    let rulesText = 'Reach 24 using all numbers'
    if (textBoxElement.innerText === rulesText) {
        textBoxElement.classList.add('hidden')
        textBoxElement.innerText = ''
    } else {
        textBoxElement.innerText = rulesText
        textBoxElement.classList.remove('hidden')
    }
})

resetButtonElement.innerText = 'Reset'
resetButtonElement.addEventListener('click', () => {
    textBoxElement.classList.add('hidden')
    newGame.activeOperation.classList.remove('selected')
    newGame.clear()
    newGame.populateNumbers()
})

checkBoxElement.addEventListener('click', () => {
    newGame.newNumbers()
    checkBoxElement.classList.toggle('hidden')
})