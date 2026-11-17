/*
 * Name: Mark Neilson Tol
 * Section: IV-BSIT C
 * Activity: N4 - Basic HTTP Server
 * Date: November 17, 2026
 */

const http = require("http");

const PORT = 8000;

// Create the server. This function runs on every request.
const server = http.createServer((req, res) => {
  // Choose the response based on the requested URL
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome!</h1><p>Name: Mark Neilson Tol</p><p>Section: IV-BSIT C</p>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About</h1><p>I am Mark Neilson Tol, a fourth year BSIT student in section IV-BSIT C. I am learning Node.js and Python, and this is my simple HTTP server.</p>");
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact</h1><p>Email: markneilsontol@gmail.com</p>");
  } else {
    // Any other URL returns a 404
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404</h1><p>Page not found</p>");
  }
});

// Start listening and log a message in the terminal
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});