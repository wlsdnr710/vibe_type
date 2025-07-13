
import React, { useState, useEffect, useRef } from 'react';
import Word from './Word';
import Stats from './Stats';
import './TypingTest.css';

const TypingTest = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [typedText, setTypedText] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const sampleText = "The quick brown fox jumps over the lazy dog. This is a sample text for the typing test. It contains several words and punctuation marks. Try to type it as fast and as accurately as possible. Good luck!";
    setText(sampleText);
    setWords(sampleText.split(' '));
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    if (isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const { value } = e.target;
    setUserInput(value);

    if (value.endsWith(' ')) {
      setTypedText(prev => prev + value);
      if (wordIndex < words.length - 1) {
        setWordIndex(wordIndex + 1);
        setUserInput('');
      } else {
        setIsFinished(true);
        setEndTime(Date.now());
      }
    }
  };

  const resetTest = () => {
    const sampleText = "The quick brown fox jumps over the lazy dog. This is a sample text for the typing test. It contains several words and punctuation marks. Try to type it as fast and as accurately as possible. Good luck!";
    setText(sampleText);
    setWords(sampleText.split(' '));
    setUserInput('');
    setTypedText('');
    setWordIndex(0);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
    inputRef.current.focus();
  };

  const typedWords = typedText.trim().split(' ');
  const currentWord = words[wordIndex];
  const typedWord = userInput.trim();

  return (
    <div className="typing-test-container">
      <div className="words-container">
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            isActive={index === wordIndex}
            isCorrect={index < wordIndex && words[index] === typedWords[index]}
            isIncorrect={index < wordIndex && words[index] !== typedWords[index]}
          />
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="typing-input"
        disabled={isFinished}
      />
      {isFinished && (
        <div className="results-container">
          <Stats
            startTime={startTime}
            endTime={endTime}
            text={text}
            userInput={typedText + userInput}
          />
          <button onClick={resetTest} className="reset-button">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
