import * as React from 'react';
import { useState, useEffect } from 'react';

// Define the structure of a question
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Fetch questions from the backend
  useEffect(() => {
    fetch('http://localhost:3001/api/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of the quiz
      alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    }
  };

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="text-lg mb-6">{currentQuestion.question}</p>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={`p-4 rounded-lg text-left transition-colors duration-300 ${
                showFeedback && index === currentQuestion.correctAnswer
                  ? 'bg-green-500' // Correct answer
                  : showFeedback && index === selectedAnswer
                  ? 'bg-red-500' // Incorrect selection
                  : 'bg-gray-700 hover:bg-gray-600'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {option}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
