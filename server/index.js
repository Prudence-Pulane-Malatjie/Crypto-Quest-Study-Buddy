// ... existing code ...
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

// TODO: Create an endpoint for fun facts

app.get("/", (req, res) => {
  res.send("Hello from the Crypto Quest Study Buddy server!");
});
// ... existing code ...
