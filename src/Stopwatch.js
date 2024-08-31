import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

function Stopwatch() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 }); // Add hours to state
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [intervalId]);

  const startStopwatch = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
          seconds += 1;
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }
          if (minutes === 60) {
            minutes = 0;
            hours += 1;
          }
          return { hours, minutes, seconds };
        });
      }, 1000);

      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const stopStopwatch = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalId);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, '0'); // Formats time to always have 2 digits
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-frame">
        <h1 className="stopwatch-title">STOPWATCH</h1>
        <div className="stopwatch-time">
          {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
        </div>
      <h6 className="stopwatch-footer">Made with ❤️ by Abdul Hassan Mohsini</h6>
        <div className="button-group">
          <button className="stopwatch-button" onClick={startStopwatch} disabled={isRunning}>
            Start
          </button>
          <button className="stopwatch-button" onClick={stopStopwatch} disabled={!isRunning}>
            Stop
          </button>
          <button className="stopwatch-button" onClick={resetStopwatch}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;



