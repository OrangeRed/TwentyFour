import { useState } from "preact/hooks"
import "./app.css"

export function App() {
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute bg-orange-400 rounded-full w-full h-full"></div>
      {/* Corner Decorations */}
      <div className="absolute w-[90%] h-[90%] grid grid-cols-2 grid-rows-2 bg-transparent">
        <div className="w-full top-left-corner"></div>
        <div className="w-full top-right-corner"></div>
        <div className="w-full bottom-left-corner"></div>
        <div className="w-full bottom-right-corner"></div>
      </div>

      {/* Card Contents */}
      <div class="grid grid-cols-3 grid-rows-3 justify-start items-center w-full h-full">
        <div className="number-button button col-span-3">1</div>
        <div className="number-button button">2</div>
        <div className="bg-zinc-200 border-4 border-red-700 w-36 h-36 grid grid-cols-2 grid-rows-2 justify-center items-center z-10 ">
          <button className="m-auto w-12 z-20 rounded-full border-2 border-black bg-rose-400 hover:bg-rose-600 focus:bg-rose-600">
            +
          </button>
          <button className="m-auto w-12 z-20 rounded-full border-2 border-black bg-rose-400 hover:bg-rose-600 focus:bg-rose-600">
            -
          </button>
          <button className="m-auto w-12 z-20 rounded-full border-2 border-black bg-rose-400 hover:bg-rose-600 focus:bg-rose-600">
            *
          </button>
          <button className="m-auto w-12 z-20 rounded-full border-2 border-black bg-rose-400 hover:bg-rose-600 focus:bg-rose-600">
            \
          </button>
        </div>
        <div className="number-button button">3</div>
        <div className="number-button button col-span-3">4</div>
      </div>
      <div className="dummy"></div>
    </div>
  )
}
