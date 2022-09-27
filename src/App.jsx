import "./App.scss";
import { useEffect, useState } from "react";
import Weather from "./Components/Weather/Weather";

const App = () => {
  const [location, setLocation] = useState();

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
    getLocation();
  }, []);

  return (
    <div className="app">
      <Weather location={location} />
    </div>
  );
};

export default App;
