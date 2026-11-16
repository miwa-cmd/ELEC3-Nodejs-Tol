/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N2 - Modular Calculator (formatter module)
 * Date: November 17, 2026
 */

// Symbols used when showing the result
const symbols = { add: "+", subtract: "-", multiply: "*", divide: "/" };

// Formats the result for display, like: 12 + 8 = 20
function formatResult(operation, numbers, result) {
  if (operation === "average") {
    return `Average of ${numbers.join(", ")} = ${result}`;
  }
  return `${numbers[0]} ${symbols[operation]} ${numbers[1]} = ${result}`;
}

module.exports = { formatResult };