// main entry point for backend server.

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; // Port for the backend server

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// A simple test route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Crypto Quest Study Buddy Server!' });
});

// TODO: Add routes for quiz questions and fun facts

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
