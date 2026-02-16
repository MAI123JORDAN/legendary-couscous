import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const tickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  //  The Stopwatch Effect
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          // Play sound on every increment
          tickSound.currentTime = 0; // Reset sound to start
          tickSound.play().catch(() => {}); // Catch error if browser blocks auto-play
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // THE CLEANUP
    return () => clearInterval(interval);
  }, [isActive]);

  // Clock Logic
  useEffect(() => {
    // Trick every 1000ms
    const timerID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // CLEANUP: This kills the timer if we cloase the app
    return () => clearInterval(timerID);
  }, []);

  // Time Formatter
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <div className="cyber-wrapper">
      <div className={`cyber-container ${isActive ? 'active-system' : ''}`}>
        <div className="module-label">SYSTEM_TIME_v1.0</div>
        <div className="clock-display">{time}</div>

        <div className="industrial-divider"></div>

        <div className="stopwatch-section">
          <div className={`stopwatch-display ${isActive ? 'active-glow' : ''}`}>
            {formatTime(seconds)}
          </div>
        </div>

        <div className="button-grid">
          {!isActive ? (
            <button className="btn-start" onClick={() => setIsActive(true)}>START_PROCEDURE</button>
          ) : (
            <button className="btn-stop" onClick={() => setIsActive(false)}>HALT_SYSTEM</button>
          )}
          <button className="btn-reset" onClick={() => {setSeconds(0); setIsActive(false);}}>RESET</button>
        </div>

        {/* Stop Watch */}
        <p className="status-text">SYSTEM_READY...</p>
      </div>
    </div>
  )
}

export default App
