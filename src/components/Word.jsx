
import React from 'react';

const Word = ({ word, isCorrect, isIncorrect, isActive }) => {
  const getWordClass = () => {
    if (isCorrect) return 'correct';
    if (isIncorrect) return 'incorrect';
    if (isActive) return 'active';
    return '';
  };

  return <span className={`word ${getWordClass()}`}>{word} </span>;
};

export default Word;
