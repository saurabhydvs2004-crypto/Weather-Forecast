// Replace with your OpenWeatherMap API key
const API_KEY = "fa3273b72b0312ff7d85471b596b1ee1";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const errorMsg = document.getElementById("error-message");
const weatherDetails = document.getElementById("weather-details");

const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  // units=metric provides temperature in Celsius
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check spelling.");
      } else {
        throw new Error("Failed to load weather data.");
      }
    }

    const data = await response.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

function renderWeather(data) {
  errorMsg.classList.add("hidden");
  weatherDetails.classList.remove("hidden");

  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = Math.round(data.main.temp);
  conditionEl.textContent = data.weather[0].description;
  humidityEl.textContent = `${data.main.humidity}%`;
}

function showError(message) {
  weatherDetails.classList.add("hidden");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}