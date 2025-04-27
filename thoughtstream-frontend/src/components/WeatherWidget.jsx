/* 
• Component to display user’s location and the weather information (temperature, condition,
icons, etc.)
*/
import { useEffect, useState } from "react";
import axios from "axios";

function WeatherWidget(){
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const {latitude, longitude} = position.coords;
            const key = import.meta.env.VITE_WEATHER_API_KEY;
            // console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`)
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);

            setWeather ({
                city: response.data.name,
                temp:response.data.main.temp,
                condition: response.data.weather[0].main
            });
        }
        );
    },[]);

    if (!weather) {
        return <p>Loading weather data...</p>;
    }

   return(
    <div>
        <p>Location: {weather.city}</p>
        <p>Temp: {weather.temp}</p>
        <p>Condition: {weather.condition}</p>
    </div>
   );
}

export default WeatherWidget;