import "./Weather.scss";
import { useState, useEffect } from "react";
import sunrise from "../../assets/sunrise.svg";
import sunset from "../../assets/sunset.svg";

const Weather = ({ location }) => {
  const [weather, setWeather] = useState();
  const [forecastToggle, setForecastToggle] = useState();
  const key = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (key, location) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location.latitude},${location.longitude}&days=5`
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

  const displayForecast = () =>
    !forecastToggle
      ? setForecastToggle("weather--forecast")
      : setForecastToggle();

  const forecastJSX = weather?.forecast.forecastday.map((obj) => {
    const d = new Date(obj.date_epoch * 1000);
    return (
      <div className="weather__forecast" key={obj.date_epoch}>
        <p className="forecast__day">
          {d.toLocaleDateString("en-GB", { weekday: "long" })}
        </p>
        <p className="forecast__hl">
          {Math.round(obj.day.maxtemp_c)}°{" "}
          <span>{Math.round(obj.day.mintemp_c)}°</span>
        </p>
        <img
          className="forecast__icon"
          src={obj.day.condition.icon}
          alt="weather symbol"
        />
        <p className="forecast__condition">{obj.day.condition.text}</p>
        <div className="forecast__sun">
          <div className="sun__rise">
            <img className="sun__icon" src={sunrise} alt="sunrise" />
            <span> {obj.astro.sunrise}</span>
          </div>
          |
          <div className="sun__set">
            <img className="sun__icon" src={sunset} alt="sunset" />
            <span>{obj.astro.sunset}</span>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (location) {
      fetchWeather(key, location);
    }
  }, [key, location]);

  return (
    <div
      className={`weather ${forecastToggle}`}
      onClick={() => displayForecast()}
    >
      {!weather ? (
        <p>loading...</p>
      ) : !forecastToggle ? (
        <>
          <p className="weather__location">{weather?.location.name}</p>
          <p className="weather__current-temp">{weather?.current.temp_c}°</p>
          <img
            className="weather__current-icon"
            src={weather?.current.condition.icon}
            alt="weather symbol"
          />
          <p className="weather__current-condition">
            {weather?.current.condition.text}
          </p>
          <p className="weather__current-hl">
            H:{Math.round(weather?.forecast.forecastday[0].day.maxtemp_c)}° L:
            {Math.round(weather?.forecast.forecastday[0].day.mintemp_c)}°
          </p>
        </>
      ) : (
        <>{forecastJSX}</>
      )}
    </div>
  );
};

export default Weather;
