/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N6 - Middleware and API Testing
 * Date: November 17, 2026
 */

const http = require("http");

const PORT = 3000;

// Sample data kept in an array (no database)
let students = [
  { id: 1, name: "Nichelle Dela Cruz", course: "BSIT", grade: 90 },
  { id: 2, name: "Mark Neilson Tol", course: "BSIT", grade: 88 },
  { id: 3, name: "Jit Lee Reyes", course: "BSCS", grade: 85 },
];
let nextId = 4;

// ---------- MIDDLEWARE ----------

// Middleware 1: logs the method, URL, and date/time of every request
function logger(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); // continue to the next middleware or the route handler
}

// Middleware 2: sets the JSON header so the handlers do not repeat it
function jsonMiddleware(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
}

// Runs the middleware one by one, then the final handler
function runMiddleware(req, res, middlewares, finalHandler) {
  let index = 0;
  function next() {
    if (index < middlewares.length) {
      const current = middlewares[index];
      index++;
      current(req, res, next);
    } else {
      finalHandler(req, res);
    }
  }
  next();
}

// ---------- HELPERS ----------

// Send a JSON response (Content-Type is already set by the middleware)
function sendJson(res, status, data) {
  res.writeHead(status);
  res.end(JSON.stringify(data));
}

// Read and parse the JSON body of a request
function readBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      callback(null, JSON.parse(body || "{}"));
    } catch (error) {
      callback(error);
    }
  });
}

// ---------- ROUTES ----------

function handleRoutes(req, res) {
  // Split the URL: /api/students/2 -> ["api", "students", "2"]
  const parts = req.url.split("/").filter(Boolean);

  if (parts[0] !== "api" || parts[1] !== "students") {
    return sendJson(res, 404, { message: "Route not found" });
  }

  const id = parts[2] ? Number(parts[2]) : null;

  // GET /api/students and GET /api/students/:id
  if (req.method === "GET") {
    if (id === null) {
      return sendJson(res, 200, students);
    }
    const student = students.find((s) => s.id === id);
    if (!student) {
      return sendJson(res, 404, { message: "Student not found" });
    }
    return sendJson(res, 200, student);
  }

  // POST /api/students
  if (req.method === "POST" && id === null) {
    return readBody(req, (error, data) => {
      if (error || !data.name) {
        return sendJson(res, 400, { message: "Invalid JSON or missing name" });
      }
      const newStudent = {
        id: nextId++,
        name: data.name,
        course: data.course || "",
        grade: data.grade || 0,
      };
      students.push(newStudent);
      sendJson(res, 201, newStudent);
    });
  }

  // PUT /api/students/:id
  if (req.method === "PUT" && id !== null) {
    const student = students.find((s) => s.id === id);
    if (!student) {
      return sendJson(res, 404, { message: "Student not found" });
    }
    return readBody(req, (error, data) => {
      if (error) {
        return sendJson(res, 400, { message: "Invalid JSON" });
      }
      student.name = data.name || student.name;
      student.course = data.course || student.course;
      student.grade = data.grade !== undefined ? data.grade : student.grade;
      sendJson(res, 200, student);
    });
  }

  // DELETE /api/students/:id
  if (req.method === "DELETE" && id !== null) {
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
      return sendJson(res, 404, { message: "Student not found" });
    }
    const removed = students.splice(index, 1)[0];
    return sendJson(res, 200, { message: "Student deleted", student: removed });
  }

  sendJson(res, 405, { message: "Method not allowed" });
}

// ---------- SERVER ----------

// Every request goes through logger, then jsonMiddleware, then the routes
const server = http.createServer((req, res) => {
  runMiddleware(req, res, [logger, jsonMiddleware], handleRoutes);
});

server.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}/api/students`);
});