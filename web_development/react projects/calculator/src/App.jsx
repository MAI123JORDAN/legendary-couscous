import React, { useState } from 'react'
import './App.css'

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  // 1. DATA BANK: Advice for each category
  const healthAdvice = {
    "Underweight": {
      tips: ["Focus on nutrient-dense foods", "Include healthy fats (nuts, avocados)", "Strength training to build muscle"],
      icon: "🍎"
    },
    "Healthy Weight": {
      tips: ["Maintain balanced nutrition", "Consistent physical activity", "Ensure 7-9 hours of sleep"],
      icon: "✨"
    },
    "Overweight": {
      tips: ["Monitor portion sizes", "Increase cardio activities", "Reduce sugary beverage intake"],
      icon: "🏃"
    },
    "Obese": {
      tips: ["Consult with a healthcare provider", "Start with low-impact walking", "Focus on whole, unprocessed foods"],
      icon: "🩺"
    }
  };

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      // Formula: weight (kg) / [heihgt (m)]^2
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1); // .toFixed(1): This is a built-in JavaScript method that takes the calculated BMI value and formats it to a string with exactly one decimal place 
      setBmi(bmiValue);
    }
  };

  // HELPER: Determine the health status and color based on score
  const getStatus = (val) => {
    if (val < 18.5) return { label: "Underweight", color: "#f4a261" }; // Orange
    if (val < 25) return { label: "Healthy Weight", color: "#2e7d32" }; // Green
    if (val < 30) return { label: "Overweight", color: "#e76f51" }; // Light Red
    return { label: "Obese", color: "#d62828" }; // Deep Red
  };

  // Get current status if BMI exists
  const status = bmi ? getStatus(bmi) : null;

  return (
    <div className="bmi-wrapper">
      <div className="bmi-card">
        <header className="bmi-header">
          <h2>Health<span>Track</span></h2>
          <p>Professional Grade BMI Analysis</p>
        </header>

        {/* Part 2: The Result Display */}
        {bmi && (
          <div className="result-container">
            <div className="bmi-score" style={{ color: status.color }}>
              {bmi}
            </div>
            <div className="status-badge" style={{ backgroundColor: status.color }}>
              {status.label}
            </div>

            {/* The Visual Meter */}
            <div className="meter-bg">
              <div 
                className="meter-fill" 
                style={{ 
                  width: `${Math.min(bmi * 2.5, 100)}%`, // Simple math to fill the bar
                  backgroundColor: status.color 
                }}
              ></div>
            </div>
          </div>
        )}

        {bmi && (
          <div className="advice-section">
            <h3>{healthAdvice[status.label].icon} Recommendations</h3>
            <ul className="advice-list">
              {/* Map through the tips array for the specific status */}
              {healthAdvice[status.label].tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            
            {/* Reset Button to clear the screen */}
            <button className="reset-btn" onClick={() => {setBmi(null); setWeight(''); setHeight('');}}>
              New Assessment
            </button>
          </div>
        )}

        <form onSubmit={calculateBMI} className="bmi-form">
          <div className="input-group">
            <label>Weight (kg)</label>
            <input 
              type="number"
              placeholder="e.g. 75"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input 
              type="number" 
              placeholder="e.g. 180" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
            />
          </div>

          <button type="submit" className="calc-btn">Analyze Metrics</button>
        </form>


      </div>
    </div>
  )
}

export default App;
