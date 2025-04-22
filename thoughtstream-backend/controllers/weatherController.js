import axios from "axios";
import dotenv from "dotenv";


dotenv.config(); // Load environment variables

export const fetchWeather = async (location) => {
  try {
      const apiKey = process.env.WEATHER_API_KEY;

      if (!apiKey) {
      throw new Error("Weather API key is not defined in environment variables.");
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

      const response = await axios.get(url);

      const { temp } = response.data.main;
      const { description } = response.data.weather[0];

      return {
         condition: description,
         temperature: temp,
         location
      };
   } catch (error) {
      console.error("Error fetching weather data:", error.message);
   }
};