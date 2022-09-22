import "./App.scss";
import { useEffect, useState } from "react";

const App = () => {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();

  const key = process.env.REACT_APP_API_KEY;

  const getLocation = () => {
    console.log("get location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setLocation(position.coords)
      );
    } else {
      console.log("browser not supported");
    }
  };

  const fetchWeather = async (key, location) => {
    console.log("fetch");

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location.latitude},${location.longitude}`
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
    console.log("hello2");
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather(key, location);
    }
  }, [key, location]);

  return ;
};

export default App;
