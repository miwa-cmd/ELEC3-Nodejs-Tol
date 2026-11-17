/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N5 - REST-style API
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

// Send a JSON response with the given status code
function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
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

const server = http.createServer((req, res) => {
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

  // Any other method or path shape
  sendJson(res, 405, { message: "Method not allowed" });
});

server.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}/api/students`);
});