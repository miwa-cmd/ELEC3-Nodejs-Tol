# N5 - Students API

Run: `node index.js` (port 3000)

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/students | Returns all students |
| GET | /api/students/:id | Returns one student, or 404 if not found |
| POST | /api/students | Adds a new student from the JSON body (status 201) |
| PUT | /api/students/:id | Updates an existing student |
| DELETE | /api/students/:id | Removes a student |

Sample body for POST and PUT:

    { "name": "Ana Lopez", "course": "BSIT", "grade": 92 }