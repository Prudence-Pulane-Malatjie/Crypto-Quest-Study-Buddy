import * as React from 'react';
import { useState, useEffect } from 'react';

const cryptoFacts = [
  "Bitcoin was created in 2009 by an anonymous person or group known as Satoshi Nakamoto",
  "Ethereum introduced smart contracts that execute automatically when conditions are met",
  "The first real-world Bitcoin transaction was for two pizzas, worth about $41 at the time",
  "Cryptocurrencies use blockchain technology to maintain a decentralized ledger",
  "Some cryptocurrencies like Monero focus on privacy and untraceability"
];

const quizQuestions = [
  {
    question: "What is the process of adding transactions to the blockchain called?",
    options: ["Mining", "Trading", "Hashing", "Staking"],
    answer: 0
  },
  {
    question: "Which cryptocurrency introduced smart contracts?",
    options: ["Bitcoin", "Ethereum", "Litecoin", "Ripple"],
    answer: 1
  },
  {
    question: "What consensus mechanism does Bitcoin use?",
    options: ["Proof of Stake", "Proof of Work", "Delegated Proof of Stake", "Proof of Authority"],
    answer: 1
  },
  {
    question: "What does 'HODL' stand for in crypto slang?",
    options: ["Hold On for Dear Life", "Hold Our Digital Ledger", "Hold On Digital Life", "Hold On Don't Liquidate"],
    answer: 0
  },
  {
    question: "Which of these is NOT a blockchain platform?",
    options: ["Ethereum", "Cardano", "Solana", "PayPal"],
    answer: 3
  },
  {
    question: "What is the term for a 51% attack?",
    options: ["When someone controls most of the network's mining power", "When 51% of users sell their coins", "When a coin loses 51% of its value", "When 51% of nodes go offline"],
    answer: 0
  },
  {
    question: "Which of these is a layer 2 scaling solution?",
    options: ["Lightning Network", "Ethereum Mainnet", "Bitcoin Core", "Solana Validator"],
    answer: 0
  },
  {
    question: "What is the maximum supply of Bitcoin?",
    options: ["10 million", "21 million", "50 million", "Unlimited"],
    answer: 1
  },
  {
    question: "Which cryptocurrency is known as 'digital silver'?",
    options: ["Ethereum", "Litecoin", "Ripple", "Dogecoin"],
    answer: 1
  }
];

interface CryptoQuizProps {
  account: string;
}

const CryptoQuiz: React.FC<CryptoQuizProps> = ({ account }) => {
  const [currentFact, setCurrentFact] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Show a random fact when component mounts
    showRandomFact();
  }, []);

  const showRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * cryptoFacts.length);
    setCurrentFact(cryptoFacts[randomIndex]);
  };

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    showRandomFact();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Welcome, {account.substring(0, 6)}...{account.substring(38)}</h2>
        
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Did You Know?</h3>
          <p>{currentFact}</p>
          <button 
            onClick={showRandomFact}
            className="mt-2 text-blue-400 hover:text-blue-300"
          >
            Show Another Fact
          </button>
        </div>

        {!quizCompleted ? (
          <div>
            <h3 className="text-xl font-bold mb-4">Crypto Quiz</h3>
            <p className="mb-2">Question {currentQuestion + 1} of {quizQuestions.length}</p>
            <p className="font-semibold mb-4">{quizQuestions[currentQuestion].question}</p>
            
            <div className="space-y-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-lg mb-2">Your score: {score}/{quizQuestions.length}</p>
            <button 
              onClick={resetQuiz}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoQuiz;