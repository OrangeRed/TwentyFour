export function Calculate(
  leftOperand: number | undefined,
  rightOperand: number | undefined,
  operation: string
) {
  if (typeof leftOperand === "undefined" || typeof rightOperand === "undefined") {
    throw Error("How'd you manage that?")
  }

  switch (operation) {
    case "addition":
      return leftOperand + rightOperand
    case "subtraction":
      return Math.abs(leftOperand - rightOperand)
    case "multiplication":
      return leftOperand * rightOperand
    default:
      if (leftOperand % rightOperand === 0) {
        return leftOperand / rightOperand
      } else if (rightOperand % leftOperand === 0) {
        return rightOperand / leftOperand
      } else {
        throw Error("The quotient is not a whole number")
      }
  }
}
