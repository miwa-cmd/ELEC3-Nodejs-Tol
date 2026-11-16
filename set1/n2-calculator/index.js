/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N2 - Modular Calculator (main program)
 * Date: November 17, 2026
 */

const os = require("os"); // built-in module
const { add, subtract, multiply, divide, average } = require("./operations");
const { formatResult } = require("./formatter");

// Read the operation and numbers from the command line
// Example: node index.js add 12 8
const args = process.argv.slice(2);
const operation = args[0];
const numbers = args.slice(1).map(Number);

console.log(`Calculator run by: ${os.userInfo().username}`);

if (!operation) {
  console.log("Usage: node index.js <add|subtract|multiply|divide|average> <numbers>");
  process.exit(1);
}

// Check that every value is a valid number
if (numbers.length === 0 || numbers.some(isNaN)) {
  console.log("Error: Please enter valid numbers.");
  process.exit(1);
}

// Choose which function to use
const twoNumberOps = { add, subtract, multiply, divide };

try {
  let result;
  if (operation === "average") {
    result = average(numbers);
  } else if (twoNumberOps[operation]) {
    if (numbers.length !== 2) {
      console.log("Error: This operation needs exactly two numbers.");
      process.exit(1);
    }
    result = twoNumberOps[operation](numbers[0], numbers[1]);
  } else {
    console.log(`Error: Unknown operation "${operation}".`);
    process.exit(1);
  }
  console.log(formatResult(operation, numbers, result));
} catch (error) {
  console.log("Error: " + error.message);
}