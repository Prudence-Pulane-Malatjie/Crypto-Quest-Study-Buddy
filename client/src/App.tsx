import * as React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';
import FunFactModal from './components/FunFactModal';

function App() {
  const [userAccount, setUserAccount] = useState<string | null>(null);
  const [showFunFact, setShowFunFact] = useState(false);

  const handleLogin = (account: string) => {
    setUserAccount(account);
    setShowFunFact(true); // Show fun fact after login
  };

  const handleCloseFunFact = () => {
    setShowFunFact(false);
  };

  return (
    <div className="bg-gray-900">
      {!userAccount ? (
        <Login onLogin={handleLogin} />
      ) : showFunFact ? (
        <FunFactModal onClose={handleCloseFunFact} />
      ) : (
        <>
          <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Crypto Quest Study Buddy</h1>
              <p className="text-sm">
                Connected: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{`${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`}</span>
              </p>
            </div>
          </header>
          <main>
            <Quiz />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
