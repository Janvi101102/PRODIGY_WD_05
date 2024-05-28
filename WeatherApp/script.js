const apiKey = '60012493d096e411dc0d9b7c28d6520b'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherData(lat, lon);
        });
    }
});

function getWeatherByLocation() {
    const location = document.getElementById('location').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }
}

function getWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = getWeatherIcon(data.weather[0].icon);
    weatherInfo.innerHTML = `
        <div class="weather-detail"><span class="weather-icon">${weatherIcon}</span><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
        <div class="weather-detail"><span class="weather-icon"><i class="fas fa-thermometer-half"></i></span><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div class="weather-detail"><span class="weather-icon"><i class="fas fa-cloud"></i></span><strong>Condition:</strong> ${data.weather[0].description}</div>
        <div class="weather-detail"><span class="weather-icon"><i class="fas fa-tint"></i></span><strong>Humidity:</strong> ${data.main.humidity} %</div>
        <div class="weather-detail"><span class="weather-icon"><i class="fas fa-wind"></i></span><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    `;
}

function getWeatherIcon(icon) {
    switch (icon) {
        case '01d':
        case '01n':
            return '<i class="fas fa-sun"></i>';
        case '02d':
        case '02n':
            return '<i class="fas fa-cloud-sun"></i>';
        case '03d':
        case '03n':
            return '<i class="fas fa-cloud"></i>';
        case '04d':
        case '04n':
            return '<i class="fas fa-cloud-meatball"></i>';
        case '09d':
        case '09n':
            return '<i class="fas fa-cloud-showers-heavy"></i>';
        case '10d':
        case '10n':
            return '<i class="fas fa-cloud-sun-rain"></i>';
        case '11d':
        case '11n':
            return '<i class="fas fa-poo-storm"></i>';
        case '13d':
        case '13n':
            return '<i class="fas fa-snowflake"></i>';
        case '50d':
        case '50n':
            return '<i class="fas fa-smog"></i>';
        default:
            return '<i class="fas fa-question"></i>';
    }
}
