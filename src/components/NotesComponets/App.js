import React, { useState } from "react";
import "./WeatherForecast";
import WeatherForecast from "./WeatherForecast";
const API_KEY = "625023c8b35cda33d63e88971f9ecf94";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(false);
  const [forecastCity, setForecastCity] = useState("");
  const [isCelcius, setIscelcius] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      if (data.cod === "404" || city === "") {
        setError("No data Found");
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const handleToggleForecast = () => {
    if (!city) {
      setError("please enter the valid name in the search Box");
      return;
    }
    setForecast(!forecast);
    if (!forecast) {
      setForecastCity(city);
    } else {
      setForecastCity("");
    }
  };

  const toggleTemperatureUnit = () => {
    setIscelcius((prevValue) => !prevValue);
  };

  return (
    <div className="mainContainer">
      <div className="weather-app">
        <h1>Weather App</h1>
        <br></br>
        <img
          src="https://ayushkul.github.io/react-weather-app/icons/perfect-day.svg"
          alt="weatherimage"
          width={"150px"}
          height={"150px"}
        />
        <br></br>
        <div className="txt-field">
          <form onSubmit={handleSubmit}>
            <input
              className="input-box"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
        <br></br>
        {error ? (
          <div>
            <h1>{error}</h1>
          </div>
        ) : (
          <div>
            {weatherData && (
              <div className="weather-details" id="txt">
                <h2>{weatherData.name}</h2>
                <p>
                  Temperature: {""}
                  {isCelcius
                    ? `${weatherData.main.temp}°C`
                    : `${(weatherData.main.temp * 9) / 5 + 32}°F`}
                </p>
                <p>
                  Min Temperature: {""}
                  {isCelcius
                    ? `${weatherData.main.temp_min}°C`
                    : `${(weatherData.main.temp_min * 9) / 5 + 32}°F`}
                </p>
                <p>
                  Max Temperature: {""}
                  {isCelcius
                    ? `${weatherData.main.temp_max}°C`
                    : `${(weatherData.main.temp_max * 9) / 5 + 32}°F`}
                </p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Weather: {weatherData.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <div>
                  <button onClick={toggleTemperatureUnit}>
                    {isCelcius ? "switch to Farenheit" : "Switch to celecius"}
                  </button>
                </div>
                <div>
                  <label>Show 5-Day Forecast:</label>
                  <button
                    className={
                      forecast ? "toggle-button active" : "toggle-button"
                    }
                    onClick={handleToggleForecast}
                  >
                    {forecast ? "Hide" : "Show"}
                  </button>
                </div>
                <div>{forecast && <WeatherForecast city={forecastCity} />}</div>
              </div>
            )}
          </div>
        )}
        {/* done the Main Component */}
      </div>
    </div>
  );
}

export default App;
