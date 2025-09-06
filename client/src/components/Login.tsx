import * as React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';

interface LoginProps {
  onLogin: (account: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        onLogin(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setErrorMessage("Failed to connect wallet. Please try again.");
      }
    } else {
      setErrorMessage("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Crypto Quest</h1>
        <p className="text-gray-400 mb-8">Connect your wallet to start your learning adventure.</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Connect Wallet
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;