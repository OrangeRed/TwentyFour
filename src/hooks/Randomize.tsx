import { useState, useEffect } from "preact/hooks"

const BASE_NUMBER = 24

// readability
const SUBTRACTION = 3
const ADDITION = 2
const MULTIPLICATION = 1
const DIVISION = 0

function randomizeNumbers() {
  let baseNumber = BASE_NUMBER
  const answers = []

  for (let i = 0; i < 3; i++) {
    let operation = Math.floor(Math.random() * 6) % 4
    let nextNumber = Math.floor(Math.random() * 10) + 2

    switch (operation) {
      case SUBTRACTION:
        // Prevent the number from being too large
        if (baseNumber + nextNumber > 24) {
          i--
          continue
        }
        answers.push(nextNumber)
        // answers.push("-")
        // answers.push(" − ")

        baseNumber = baseNumber + nextNumber
        break
      case ADDITION:
        // Prevent negative numbers
        if (baseNumber - nextNumber < 1) {
          i--
          continue
        }
        answers.push(nextNumber)
        // answers.push("+")
        // answers.push(" + ")

        baseNumber = baseNumber - nextNumber
        break
      case MULTIPLICATION:
        // Prevent numbers from being too large
        if (baseNumber * nextNumber > 32) {
          i--
          continue
        }
        answers.push(nextNumber)
        // answers.push("/")
        // answers.push(" ÷ ")

        baseNumber = baseNumber * nextNumber
        break
      default:
        // Default to division
        // Prevent fractions
        if (baseNumber % nextNumber !== 0) {
          i--
          continue
        }
        answers.push(nextNumber)
        // answers.push("*")
        // answers.push(" × ")

        baseNumber = baseNumber / nextNumber
        break
    }
  }

  return [baseNumber, ...answers.reverse()]
}

const Randomize = () => {
  const [seed, setSeed] = useState<number>()
  const [solution, setSolution] = useState<ReturnType<typeof randomizeNumbers>>([])

  useEffect(() => {
    const solution = randomizeNumbers()

    // Recompute if the value is too large
    if (solution[0] > 16) {
      setSeed(Math.random())
    } else {
      setSolution(solution)
    }
  }, [seed])

  return {
    loading: !solution[0] || solution[0] > 16,
    solution,
    randomize: () => setSeed(Math.random()),
  }
}

export default Randomize
