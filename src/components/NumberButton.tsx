import classNames from "classnames"
import type { JSX } from "preact"

type NumberButtonProps = {
  className?: string
  value: string | number
} & JSX.DOMAttributes<HTMLButtonElement>

const NumberButton = ({ className, value, onClick }: NumberButtonProps) => {
  return (
    <button
      onClick={onClick}
      value={value}
      class={classNames(
        "number-button justify-self-center z-20 bg-orange-400",
        "disabled:cursor-default transition-all duration-300",
        `${value}`.length > 2 ? "text-9xl" : "text-[12rem]",
        className ?? ""
      )}
      disabled={typeof value === "string"}
    >
      {value}
    </button>
  )
}

export default NumberButton
