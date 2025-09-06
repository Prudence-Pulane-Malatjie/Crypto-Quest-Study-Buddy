import * as React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import CryptoQuiz from './components/CryptoQuiz';

function App() {
  const [account, setAccount] = useState<string>('');
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="bg-gray-900">
      {!showQuiz ? (
        <Login 
          onLogin={setAccount} 
          setShowQuiz={setShowQuiz} 
        />
      ) : (
        <CryptoQuiz account={account} />
      )}
    </div>
  );
}

export default App;
