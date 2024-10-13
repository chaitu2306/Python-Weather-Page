document.getElementById('fetchWeatherBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

function fetchWeather(city) {
  fetch('/get_weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        displayWeather(data);
      }
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
  document.getElementById('cityName').innerText = `Weather in ${data.city}`;
  document.getElementById('temperature').innerText = `Temperature: ${data.temperature}°C`;
  document.getElementById('description').innerText = `Description: ${data.description}`;
  document.getElementById('humidity').innerText = `Humidity: ${data.humidity}%`;
  document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind_speed} m/s`;
  document.getElementById('pressure').innerText = `Pressure: ${data.pressure} hPa`;
  document.getElementById('visibility').innerText = `Visibility: ${data.visibility} km`;
  document.getElementById('uvIndex').innerText = `UV Index: ${data.uv_index}`;
  
  const sunriseTime = new Date(data.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sunset * 1000).toLocaleTimeString();
  document.getElementById('sunrise').innerText = `Sunrise: ${sunriseTime}`;
  document.getElementById('sunset').innerText = `Sunset: ${sunsetTime}`;

  document.getElementById('weatherResult').classList.remove('hidden');
}
