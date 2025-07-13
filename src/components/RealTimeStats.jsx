import React from 'react';

const RealTimeStats = ({ wpm, accuracy }) => {
  return (
    <div className="real-time-stats">
      <div className="stat">
        <span className="stat-value">{wpm}</span>
        <span className="stat-label">WPM</span>
      </div>
      <div className="stat">
        <span className="stat-value">{accuracy}%</span>
        <span className="stat-label">Accuracy</span>
      </div>
    </div>
  );
};

export default RealTimeStats;
