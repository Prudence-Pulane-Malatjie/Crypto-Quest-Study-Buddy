import * as React from 'react';

interface FunFactModalProps {
  onClose: () => void;
}

const funFacts = [
    "Africa is one of the fastest-growing crypto markets globally, with a 1,200% increase in value from 2020 to 2021.",
    "Nigeria, Kenya, and South Africa are among the top countries in the world for crypto adoption.",
    "Many Africans use cryptocurrency to hedge against inflation and currency devaluation.",
    "Mobile money is huge in Africa, and crypto is seen as the next step in financial evolution for the continent.",
    "Blockchain technology is being explored in Africa for everything from tracking agricultural products to ensuring fair elections."
];

const FunFactModal: React.FC<FunFactModalProps> = ({ onClose }) => {
    const [fact] = React.useState(funFacts[Math.floor(Math.random() * funFacts.length)]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Did You Know?</h2>
                <p className="text-gray-300 mb-6">{fact}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Start Quiz!
                </button>
            </div>
        </div>
    );
};

export default FunFactModal;