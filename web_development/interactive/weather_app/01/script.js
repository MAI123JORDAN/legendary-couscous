const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            document.getElementById('weather-info').innerText = error.message;
            document.getElementById('weather-icon').style.display = 'none'; // Hide icon on error
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const cityName = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('temp').innerText = `${temperature}°C`;
    document.getElementById('city-name').innerText = cityName;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${windSpeed} km/h`;

    // Set weather icon based on the weather condition
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    const weatherIconElement = document.getElementById('weather-icon');
    weatherIconElement.src = weatherIcon;
    weatherIconElement.style.display = 'block'; // Show the icon
}

function getWeatherIcon(weatherCondition) {
    switch(weatherCondition.toLowerCase()) {
        case 'clear':
            return 'images/clear.png'; // Add your own image paths
        case 'rain':
            return 'images/rain.png';
        case 'snow':
            return 'images/snow.png';
        case 'clouds':
            return 'images/cloudy.png';
        case 'thunderstorm':
            return 'images/thunderstorm.png';
        case 'fog':
            return 'images/fog.png';
        default:
            return 'images/default.png'; // Default image
    }
}