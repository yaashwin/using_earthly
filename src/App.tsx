import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { LockClosedIcon, LockOpenIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const SECRET_KEY = "mySecretPassword";

function App() {
  const [plaintext, setPlaintext] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const encrypt = () => {
    if (!plaintext) {
      alert('Please enter text to encrypt');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      try {
        const encrypted = CryptoJS.AES.encrypt(plaintext, SECRET_KEY).toString();
        setEncryptedText(encrypted);
        setDecryptedText('');
      } catch (error) {
        alert('Encryption failed');
      }
      setIsLoading(false);
    }, 500);
  };

  const decrypt = () => {
    if (!encryptedText) {
      alert('Please enter text to decrypt');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        
        if (decrypted) {
          setDecryptedText(decrypted);
        } else {
          setDecryptedText('Invalid encrypted text');
        }
      } catch (error) {
        setDecryptedText('Decryption failed');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cryptography Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Secure your messages with AES encryption
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <LockClosedIcon className="h-6 w-6 mr-2 text-primary-600" />
            Encrypt Text
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enter text to encrypt
              </label>
              <input
                type="text"
                id="plaintext"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Type your message here..."
              />
            </div>
            <button
              onClick={encrypt}
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  Encrypt
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <LockOpenIcon className="h-6 w-6 mr-2 text-primary-600" />
            Decrypt Text
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="encryptedText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enter encrypted text
              </label>
              <input
                type="text"
                id="encryptedText"
                value={encryptedText}
                onChange={(e) => setEncryptedText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Paste encrypted text here..."
              />
            </div>
            <button
              onClick={decrypt}
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LockOpenIcon className="h-5 w-5 mr-2" />
                  Decrypt
                </>
              )}
            </button>
          </div>
        </div>

        {(encryptedText || decryptedText) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Results</h2>
            {encryptedText && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Encrypted Text:</h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md break-all">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{encryptedText}</code>
                </div>
              </div>
            )}
            {decryptedText && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Decrypted Text:</h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{decryptedText}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;