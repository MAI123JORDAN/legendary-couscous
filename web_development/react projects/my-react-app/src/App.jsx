import React  from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function CounterApp() {
  return (
    <div className="counter_container">
      <h1>Nexus Counter</h1>

      {/* 1. The Display */}
      <div className="display">0</div>

      {/* 2. Step Control */}
      <div className="step_control">
        <label>Step Value:</label>
        <input type="number" />
      </div>

      {/* 3. Action Buttons */}
      <div className="buttons">
        <button>-</button>
        <button>+</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default CounterApp;
