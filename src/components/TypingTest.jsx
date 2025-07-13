
import React, { useState, useEffect, useRef } from 'react';
import Word from './Word';
import RealTimeStats from './RealTimeStats';
import Modal from './Modal';
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
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  useEffect(() => {
    const sampleText = "The quick brown fox jumps over the lazy dog. This is a sample text for the typing test. It contains several words and punctuation marks. Try to type it as fast and as accurately as possible. Good luck!";
    setText(sampleText);
    setWords(sampleText.split(' '));
    inputRef.current.focus();
  }, []);

  const calculateWPM = () => {
    if (!startTime) return 0;
    const durationInMinutes = (Date.now() - startTime) / 60000;
    const charactersTyped = typedText.length + userInput.length;
    return durationInMinutes > 0 ? Math.round((charactersTyped / 5) / durationInMinutes) : 0;
  };

  const calculateAccuracy = () => {
    const fullTypedText = typedText + userInput;
    const originalTextSlice = text.substring(0, fullTypedText.length);
    let correctChars = 0;
    for (let i = 0; i < fullTypedText.length; i++) {
      if (fullTypedText[i] === originalTextSlice[i]) {
        correctChars++;
      }
    }
    return fullTypedText.length > 0 ? Math.round((correctChars / fullTypedText.length) * 100) : 100;
  };

  const handleInputChange = (e) => {
    if (isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const { value } = e.target;
    setUserInput(value);
    setWpm(calculateWPM());
    setAccuracy(calculateAccuracy());

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
    setWpm(0);
    setAccuracy(100);
    inputRef.current.focus();
  };

  const typedWords = typedText.trim().split(' ');

  return (
    <div className="typing-test-container">
      <RealTimeStats wpm={wpm} accuracy={accuracy} />
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
      <Modal
        isOpen={isFinished}
        onClose={resetTest}
        startTime={startTime}
        endTime={endTime}
        text={text}
        userInput={typedText + userInput}
      />
    </div>
  );
};

export default TypingTest;
