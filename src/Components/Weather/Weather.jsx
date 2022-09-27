import "./Weather.scss";
import { useState, useEffect } from "react";

const Weather = ({ location }) => {
  const [weather, setWeather] = useState();
  const key = process.env.REACT_APP_API_KEY;

  const fetchWeather = async (key, location) => {
    console.log("fetch");

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location.latitude},${location.longitude}&days=5`
      );

      if (!response.ok) {
        throw new Error(response.status + " error with request");
      } else {
        const data = await response.json();
        setWeather(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeather(key, location);
    }
  }, [key, location]);

  return (
    <div className="weather">
      <p className="weather__location">
        {weather?.location.name}
      </p>
      <p className="weather__current-temp">{weather?.current.temp_c}°</p>
      <img className="weather__current-icon" src={weather?.current.condition.icon} alt="weather symbol" />
      <p className="weather__current-condition">{weather?.current.condition.text}</p>
      <p className="weather__forecast-hl">
        H:{weather?.forecast.forecastday[0].day.maxtemp_c}° L:
        {weather?.forecast.forecastday[0].day.mintemp_c}°
      </p>
    </div>
  );
};

export default Weather;
