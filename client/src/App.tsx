import * as React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import CryptoQuiz from './components/CryptoQuiz';

function App() {
  const [account, setAccount] = useState<string>('');
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Floating crypto elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-yellow-400 text-xl opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['₿', 'Ξ', '◆', '◈', '◎'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
      {!showQuiz ? (
        <Login 
          onLogin={setAccount} 
          setShowQuiz={setShowQuiz} 
        />
      ) : (
        <CryptoQuiz 
          account={account} 
          onDisconnect={() => setShowQuiz(false)} 
        />
      )}
    </div>
  );
}

export default App;