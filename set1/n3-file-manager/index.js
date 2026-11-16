/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N3 - File Manager with fs and path
 * Date: November 17, 2026
 */

const fs = require("fs");
const path = require("path");

// All files are stored in the "files" folder, built with path.join()
const filesDir = path.join(__dirname, "files");

// Create the files folder if it does not exist yet
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

// Read the command from the command line
// Example: node index.js create notes.txt "Hello"
const [command, fileName, ...rest] = process.argv.slice(2);
const content = rest.join(" ");

// Create a file with content
function createFile(name, text) {
  const filePath = path.join(filesDir, name);
  fs.writeFileSync(filePath, text);
  console.log(`File created: ${name}`);
}

// Read a file and show its content
function readFile(name) {
  const filePath = path.join(filesDir, name);
  try {
    const data = fs.readFileSync(filePath, "utf8");
    console.log(`Content of ${name}:\n${data}`);
  } catch (error) {
    console.log(`Error: File "${name}" does not exist.`);
  }
}

// Update a file by appending text
function updateFile(name, text) {
  const filePath = path.join(filesDir, name);
  if (!fs.existsSync(filePath)) {
    console.log(`Error: File "${name}" does not exist.`);
    return;
  }
  fs.appendFileSync(filePath, "\n" + text);
  console.log(`File updated: ${name}`);
}

// Delete a file
function deleteFile(name) {
  const filePath = path.join(filesDir, name);
  try {
    fs.unlinkSync(filePath);
    console.log(`File deleted: ${name}`);
  } catch (error) {
    console.log(`Error: File "${name}" does not exist.`);
  }
}

// List every file with its full path, name, extension, and content
function listFiles() {
  const files = fs.readdirSync(filesDir);
  if (files.length === 0) {
    console.log("No files found in the files folder.");
    return;
  }
  for (const file of files) {
    const filePath = path.join(filesDir, file);
    console.log("-----------------------------");
    console.log("Full path : " + filePath);
    console.log("File name : " + path.basename(filePath));
    console.log("Extension : " + path.extname(filePath));
    console.log("Content   : " + fs.readFileSync(filePath, "utf8"));
  }
}

// Run the command the user typed
function showUsage() {
  console.log("Usage:");
  console.log('  node index.js create <file> "<content>"');
  console.log("  node index.js read <file>");
  console.log('  node index.js update <file> "<text to append>"');
  console.log("  node index.js delete <file>");
  console.log("  node index.js list");
}

if (command === "list") {
  listFiles();
} else if (["create", "read", "update", "delete"].includes(command) && fileName) {
  if (command === "create") createFile(fileName, content);
  if (command === "read") readFile(fileName);
  if (command === "update") updateFile(fileName, content);
  if (command === "delete") deleteFile(fileName);
} else {
  showUsage();
}