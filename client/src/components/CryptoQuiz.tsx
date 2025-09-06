import * as React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const cryptoFacts = [
  "Bitcoin was created in 2009 by an anonymous person or group known as Satoshi Nakamoto",
  "Ethereum introduced smart contracts that execute automatically when conditions are met",
  "The first real-world Bitcoin transaction was for two pizzas, worth about $41 at the time",
  "Cryptocurrencies use blockchain technology to maintain a decentralized ledger",
  "Some cryptocurrencies like Monero focus on privacy and untraceability",
  "DeFi (Decentralized Finance) aims to recreate traditional financial systems without intermediaries",
  "NFTs (Non-Fungible Tokens) represent unique digital assets on the blockchain",
  "Stablecoins are cryptocurrencies pegged to stable assets like the US dollar",
  "The Lightning Network enables fast Bitcoin transactions with lower fees",
  "Zero-knowledge proofs allow verification without revealing underlying data"
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
  },
  {
    question: "What is the purpose of a nonce in blockchain?",
    options: ["To prevent double spending", "To make each block unique", "To encrypt transactions", "To validate smart contracts"],
    answer: 1
  },
  {
    question: "Which of these is a popular DeFi protocol?",
    options: ["Uniswap", "Bitcoin", "Ripple", "Tether"],
    answer: 0
  },
  {
    question: "What does 'DYOR' stand for in crypto?",
    options: ["Do Your Own Research", "Decentralized Yield Offering Rate", "Digital Yield Optimization Ratio", "Dynamic Yield On Returns"],
    answer: 0
  },
  {
    question: "Which blockchain uses a delegated proof-of-stake consensus?",
    options: ["Ethereum", "Cardano", "Solana", "Bitcoin"],
    answer: 2
  },
  {
    question: "What is the main purpose of a stablecoin?",
    options: ["To provide price stability", "To enable anonymous transactions", "To replace Bitcoin", "To mine faster"],
    answer: 0
  },
  {
    question: "Which of these is NOT a type of cryptocurrency wallet?",
    options: ["Hardware wallet", "Paper wallet", "Software wallet", "Block wallet"],
    answer: 3
  },
  {
    question: "What is 'gas' in Ethereum?",
    options: ["A type of token", "The fee required for transactions", "A mining algorithm", "A consensus mechanism"],
    answer: 1
  },
  {
    question: "Which of these is a privacy-focused cryptocurrency?",
    options: ["Bitcoin", "Ethereum", "Monero", "Litecoin"],
    answer: 2
  },
  {
    question: "What is the purpose of an oracle in blockchain?",
    options: ["To predict prices", "To connect blockchains to external data", "To validate transactions", "To mine new blocks"],
    answer: 1
  },
  {
    question: "Which of these is a sidechain solution?",
    options: ["Lightning Network", "Polygon", "Uniswap", "Chainlink"],
    answer: 1
  },
  {
    question: "What is 'sharding' in blockchain?",
    options: ["A type of wallet", "A way to split the network to improve scalability", "A consensus algorithm", "A smart contract language"],
    answer: 1
  }
];

interface CryptoQuizProps {
  account: string;
  onDisconnect: () => void;
}

const CryptoQuiz: React.FC<CryptoQuizProps> = ({ account, onDisconnect }) => {
  const [currentFact, setCurrentFact] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showReward, setShowReward] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    // Show a random fact when component mounts
    showRandomFact();
  }, []);

  const showRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * cryptoFacts.length);
    setCurrentFact(cryptoFacts[randomIndex]);
  };

  const handleAnswer = (selectedOption: number) => {
    setSelectedOption(selectedOption);
    setShowFeedback(true);
    const correct = selectedOption === quizQuestions[currentQuestion].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Welcome, {account.substring(0, 6)}...{account.substring(38)}</h2>
          <button 
            onClick={onDisconnect}
            className="text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
          >
            Disconnect
          </button>
        </div>
        
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
                  disabled={showFeedback}
                  className={`w-full p-3 rounded-lg text-left ${showFeedback && selectedOption === index 
                    ? isCorrect 
                      ? 'bg-green-700' 
                      : 'bg-red-700'
                    : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {option}
                  {showFeedback && selectedOption === index && (
                    <span className="float-right">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </button>
              ))}
              {showFeedback && (
                <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-900' : 'bg-red-900'}`}>
                  {isCorrect 
                    ? 'Correct! ' 
                    : `Incorrect! The correct answer is: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].answer]}`}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-lg mb-2">Your score: {score}/{quizQuestions.length}</p>
            <div className="flex flex-col items-center space-y-4 mt-6">
              {score === quizQuestions.length && (
                <button 
                  onClick={() => setShowReward(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full animate-bounce"
                >
                  🎉 Claim Your Reward!
                </button>
              )}
              <div className="flex space-x-4">
                <button 
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Try Again
                </button>
                <button 
                  onClick={onDisconnect}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
            
            {showReward && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-xl max-w-md w-full text-center animate-pulse">
                  <h3 className="text-2xl font-bold mb-4">🏆 Perfect Score! 🏆</h3>
                  <p className="mb-6">You've earned a special NFT reward for your crypto knowledge!</p>
                  <button 
                    onClick={() => setShowReward(false)}
                    className="bg-white text-yellow-600 font-bold py-2 px-6 rounded-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoQuiz;