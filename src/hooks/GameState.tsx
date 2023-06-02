import { useEffect, useState } from "preact/hooks"
import { Calculate } from "../utils/Calculate"

const GameState = (state: (number | undefined)[]) => {
  const [gameState, setGameState] = useState<(number | undefined)[]>([])

  // Track user selections
  const [selectedNumbers, setSelectedNumbers] = useState<(number | undefined)[]>([])
  const [selectedOperation, setSelectedOperation] = useState<string>()

  useEffect(() => updateGameState(state), [state])

  useEffect(() => {
    const gameStateCopy = [...gameState]
    const [leftIndex, rightIndex] = selectedNumbers.map((idx) =>
      idx !== undefined ? idx : undefined
    )

    // Don't attempt to calc if any of these are undefined
    if (leftIndex === undefined || rightIndex === undefined || !selectedOperation) {
      return
    }

    try {
      const calc = Calculate(gameState[leftIndex], gameState[rightIndex], selectedOperation)

      if (calc !== undefined) {
        console.log(calc)

        gameStateCopy[rightIndex] = calc
        gameStateCopy[leftIndex] = undefined
      }
    } catch (e) {
      console.log(e)
    }

    updateGameState(gameStateCopy)
  }, [selectedNumbers, selectedOperation])

  function updateGameState(state: (number | undefined)[]) {
    setGameState(state)
    setSelectedNumbers([])
    setSelectedOperation(undefined)
  }

  function updateNumberSelection(idx: number) {
    console.log("Clicked")
    const selectedNumbersCopy = [...selectedNumbers]
    const location = selectedNumbersCopy.indexOf(idx)

    // Replace the last selection with the new one
    if (location === 0) {
      selectedNumbersCopy.shift()
      // Remove the second index if it is already selected
    } else if (location === 1) {
      selectedNumbersCopy.pop()
      // Add an index
    } else if (selectedNumbersCopy.length === 2) {
      selectedNumbersCopy.pop()
      selectedNumbersCopy.push(idx)
      // Remove the first index if it is already selected
    } else {
      selectedNumbersCopy.push(idx)
    }

    setSelectedNumbers(selectedNumbersCopy)
  }

  return {
    gameState,
    updateGameState,
    selectedNumbers,
    updateNumberSelection,
    selectedOperation,
    setSelectedOperation,
  }
}

export default GameState
