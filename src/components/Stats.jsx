
import React from 'react';

const Stats = ({ startTime, endTime, text, userInput }) => {
  if (!startTime || !endTime) return null;

  const durationInMinutes = (endTime - startTime) / 60000;
  
  // WPM calculation based on characters (standard is 5 chars per word)
  const charactersTyped = userInput.length;
  const wpm = durationInMinutes > 0 ? Math.round((charactersTyped / 5) / durationInMinutes) : 0;

  // Accuracy calculation
  const originalWords = text.split(' ');
  const typedWords = userInput.trim().split(' ');
  let correctWordsCount = 0;
  
  const comparisonLength = Math.min(originalWords.length, typedWords.length);

  for (let i = 0; i < comparisonLength; i++) {
      if (typedWords[i] === originalWords[i]) {
          correctWordsCount++;
      }
  }

  const accuracy = typedWords.length > 0 ? Math.round((correctWordsCount / typedWords.length) * 100) : 0;

  return (
    <div className="stats">
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
};

export default Stats;
