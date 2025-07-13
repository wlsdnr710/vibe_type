import React, { useState } from 'react';
import TypingTest from './components/TypingTest';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      <div className="app-container">
        <header className="app-header">
          <h1>Vibe Type</h1>
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        <main>
          <TypingTest />
        </main>
      </div>
    </div>
  );
}

export default App;
