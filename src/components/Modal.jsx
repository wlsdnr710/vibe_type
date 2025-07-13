import React from 'react';
import './Modal.css';
import Stats from './Stats';

const Modal = ({ isOpen, onClose, startTime, endTime, text, userInput }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Test Completed!</h2>
        <Stats 
          startTime={startTime} 
          endTime={endTime} 
          text={text} 
          userInput={userInput} 
        />
        <button onClick={onClose} className="reset-button">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
