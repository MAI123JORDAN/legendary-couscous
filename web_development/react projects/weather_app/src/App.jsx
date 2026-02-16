import React, { useState } from 'react'

import './App.css'

function App() {
  const [city, setCity] = useState(''); // Stores the user's input
  const [weather, setWeather] = useState(null); // Stores the API response
  const [loading, setLoading] = useState(false);

  const API_KEY = "******************"; // I'll replace this  later ....

  // Func: Fetch weather data from the API
  const searchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        alert("City not found. Please try again.");
      }
    } catch {
      console.error("Connection Error: ");
    }
    setLoading(false);
  };

  return (
    <div className="weather-wrapper">
      <div className="weather-card">
        <form onSubmit={searchWeather} className="search-box">
          <input 
            type="text" 
            placeholder="Enter city name..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {loading && <p className="status-msg">Locating coordinates...</p>}
      </div>
    </div>
  )
}

export default App
