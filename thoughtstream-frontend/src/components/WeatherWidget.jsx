/* 
• Component to display user’s location and the weather information (temperature, condition,
icons, etc.)
*/
import { useEffect, useState } from "react";

function WeatherWidget(){
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const {latitude, longitude} = position.coords;
            const key = import.meta.env.VITE_WEATHER_API_KEY;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);
            
            setWeather ({
                city: res.data.name,
                temp:res.data.main.temp,
                condition: res.data.weather[0].main,
                icon:res.data.weather[0].icon,
            });
        }
        );
    },[]);
   return(
    <div>
        <p>Location: {weather.city}</p>
        <p>Temp: {weather.temp}</p>
        <p>Condition: {weather.condition}</p>
        <p>Icon: </p>
    </div>
   );
}

export default WeatherWidget;