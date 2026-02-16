import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // HELPER: Generates a random Hex color string
  const generateRandomColor = () => {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // STATE: An array of 5 color objects
  const [colors, setColors] = useState([
    { id: 1, hex: generateRandomColor(), isLocked: false },
    { id: 2, hex: generateRandomColor(), isLocked: false },
    { id: 3, hex: generateRandomColor(), isLocked: false },
    { id: 4, hex: generateRandomColor(), isLocked: false },
    { id: 5, hex: generateRandomColor(), isLocked: false },
  ]);

  // FUNCTION: Generate a new palette (only for unlocked colors)
  const refreshPalette = () => {
    setColors(prevColors => 
      prevColors.map(color => 
        color.isLocked ? color : { ...color, hex: generateRandomColor() }
      )
    );
  };

  // FUNCTION: Toggle the lock status of a specific color
  const toggleLock = (id) => {
    setColors(prevColors => 
      prevColors.map(color => 
        // If the ID matches the one clicked, flip the isLocked value
        color.id === id ? { ...color, isLocked: !color.isLocked } : color
      )
    );
  };

  // FUNCTION: Copy Hex to Clipboard
  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    // We'll use a simple alert for now, but in a pro app, you'd use a 'Toast'
    alert(`Color ${hex} copied!`);
  };

  useEffect(() => {
    // FUNCTION: Check if the key pressed is Space
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        refreshPalette(); // Trigger the refresh we built in Part 1
      }
    };

    // Add the listener to the whole window
    window.addEventListener('keydown', handleKeyDown);

    // CLEANUP: Very important! Remove the listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [colors]); // Re-run if colors change so refreshPalette has latest state

  return (
    <div className="palette-wrapper">
      <div className="colors-container">
        {colors.map(color => (
          <div 
            key={color.id} 
            className="color-column" 
            style={{ backgroundColor: color.hex }}
          >
            {/* We'll use FontAwesome icons for the lock */}
            <button className="lock-btn" onClick={() => toggleLock(color.id)}>
              <i className={color.isLocked ? "fa-solid fa-lock" : "fa-solid fa-lock-open"}></i>
            </button>

            <span className="hex-code" onClick={() => copyHex(color.hex)}>
              {color.hex}
            </span>
            {/* Lock button will go here in Part 2 */}
          </div>
        ))}
      </div>
      
      <p className="hint">Press [SPACE] to generate new colors</p>
      
      <button className="generate-btn" onClick={refreshPalette}>
        GENERATE NEW PALETTE
      </button>
    </div>
  );
}

export default App;