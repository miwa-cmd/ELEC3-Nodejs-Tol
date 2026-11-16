/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N2 - Modular Calculator (operations module)
 * Date: November 17, 2026
 */

// Basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// Throws an error if the divisor is zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

// Takes an array of numbers and returns their average
function average(numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total / numbers.length;
}

// Export the functions so other files can use require()
module.exports = { add, subtract, multiply, divide, average };