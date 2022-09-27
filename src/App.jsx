import "./App.scss";
import { useEffect, useState } from "react";
import Weather from "./Components/Weather/Weather";
import News from "./Components/News/News";

const App = () => {
  const [location, setLocation] = useState();
  const [timeOfDay, setTimeOfDay] = useState("morning");

  const date = new Date();
  const currentHour = date.getHours();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setLocation(position.coords)
      );
    } else {
      console.log("browser not supported");
    }
  };

  useEffect(() => {
    if (currentHour > 18) {
      setTimeOfDay("evening");
    } else if (currentHour > 12) {
      setTimeOfDay("afternoon");
    }

    getLocation();
  }, [currentHour]);

  return (
    <div className="app">
      <div className="app__welcome">
        <h1 className="welcome__message">Good {timeOfDay}</h1>
        <h2 className="welcome__date">{date.toDateString()}</h2>
      </div>

      <div className="app__widgets">
        <Weather location={location} />
        {/* <News /> */}
      </div>
    </div>
  );
};

export default App;
