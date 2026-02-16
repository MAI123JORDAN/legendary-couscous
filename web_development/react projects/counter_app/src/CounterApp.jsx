import React, { useState } from 'react';
import './CounterApp.css';

function CounterApp() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Safety Functions
  const handleIncrement = () => {
    if (count + step <= 1000) { // Max limit of 1000
      setCount(count + step);
    }
  };

  const handleDecrement = () => {
    if (count - step >= 0) { // Min limit of 0
      setCount(count - step);
    }
  };

  return (
    <div className="neon-wrapper">
      <div className="neon-card">
        <h2>Vibe <span>Counter</span></h2>
        
        <div className="count-display">{count}</div>

        <div className="controls">
          <div className="input-group">
            <span>Step Size</span>
            <input 
              type="number" 
              value={step} 
              onChange={(e) => setStep(Math.max(1, Number(e.target.value)))} 
            />
          </div>

          <div className="btns">
            <button onClick={handleDecrement} className="btn-minus">-</button>
            <button onClick={handleIncrement} className="btn-plus">+</button>
          </div>
          
          <button onClick={() => setCount(0)} className="reset-link">Reset to Zero</button>
        </div>
      </div>
    </div>
  );
}

export default CounterApp;