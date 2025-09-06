const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// A simple array of quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is a key feature of blockchain technology?",
    options: [
      "Centralized control",
      "Immutable records",
      "Temporary data storage",
      "Easy data modification",
    ],
    correctAnswer: 1, // Index of the correct answer in the options array
  },
  // TODO: Add more questions
];

// API endpoint to get quiz questions
app.get("/api/questions", (req, res) => {
  res.json(quizQuestions);
});

// Fun facts about crypto in Africa
const funFacts = [
    "Africa is one of the fastest-growing crypto markets globally, with a 1,200% increase in value from 2020 to 2021.",
    "Nigeria, Kenya, and South Africa are among the top countries in the world for crypto adoption.",
    "Many Africans use cryptocurrency to hedge against inflation and currency devaluation.",
    "Mobile money is huge in Africa, and crypto is seen as the next step in financial evolution for the continent.",
    "Blockchain technology is being explored in Africa for everything from tracking agricultural products to ensuring fair elections."
];

// API endpoint to get a random fun fact
app.get("/api/funfact", (req, res) => {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  res.json({ fact });
});

app.get("/", (req, res) => {
  res.send("Hello from the Crypto Quest Study Buddy server!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});