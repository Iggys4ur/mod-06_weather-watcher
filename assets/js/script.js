
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
        saveToHistory(city);
        displayHistory();
    }
});

function fetchWeatherData(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherHtml = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('current-weather-data').innerHTML = weatherHtml;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherHistory', JSON.stringify(history));
    }
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const historyHtml = history.map(city => `<li>${city}</li>`).join('');
    document.getElementById('search-history').innerHTML = historyHtml;
}

// Display search history on load
displayHistory();
