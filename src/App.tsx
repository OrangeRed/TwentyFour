import classNames from "classnames"

import Randomize from "./hooks/Randomize"
import GameState from "./hooks/GameState"
import NumberButton from "./components/NumberButton"

import type { ComponentChild } from "preact"

const OPERATIONS = {
  addition: "+",
  subtraction: "−",
  multiplication: "×",
  division: "÷",
}

const App = () => {
  const { loading, solution, randomize } = Randomize()
  const {
    gameState,
    selectedOperation,
    selectedNumbers,
    setSelectedOperation: setOperation,
    updateNumberSelection,
  } = GameState(solution)

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div class="relative flex justify-center items-center">
      <div class="absolute bg-orange-400 rounded-full w-full h-full" />

      {/*   Four Corner Stripes   */}
      <div class="absolute w-[90%] h-[90%] grid grid-cols-2 grid-rows-2 bg-transparent">
        <div class="w-full top-left-corner"></div>
        <div class="w-full top-right-corner"></div>
        <div class="w-full bottom-left-corner"></div>
        <div class="w-full bottom-right-corner"></div>
      </div>

      <div class="grid grid-cols-3 grid-rows-3 items-center w-full h-full">
        {gameState.map((_, idx) => {
          const children: ComponentChild[] = []

          children.push(
            <NumberButton
              value={gameState[idx] ?? ""}
              onClick={() => updateNumberSelection(idx)}
              className={classNames({
                "col-span-3": idx === 0 || idx === 3,
                selected: selectedNumbers.includes(idx),
              })}
            />
          )

          // Add the center after the second Number Button
          if (idx === 1) {
            children.push(
              <div
                class={classNames(
                  "center grid grid-cols-2 grid-rows-2",
                  "justify-center items-center z-10",
                  "border-4 border-red-700 bg-zinc-200 "
                )}
              >
                {Object.entries(OPERATIONS).map(([name, symbol]) => (
                  <button
                    onClick={() => setOperation((prev) => (prev === name ? undefined : name))}
                    class={classNames("inline-flex justify-center items-center", name, {
                      selected: name === selectedOperation,
                    })}
                  >
                    {symbol}
                    <span class="sr-only">{name}</span>
                  </button>
                ))}
              </div>
            )
          }

          return children
        })}
      </div>
    </div>
  )
}

export default App
