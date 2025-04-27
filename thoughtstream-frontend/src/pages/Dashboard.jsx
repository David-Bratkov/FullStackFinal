import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { createEntry, fetchEntries } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const { user, token } = useContext(AuthContext); 
   const [entries, setEntries] = useState([]); 
   const navigate = useNavigate();

   // Handle form submission
   const handleSubmit = (entryData) => {
      navigator.geolocation.getCurrentPosition(async (position) => {
         const {latitude, longitude} = position.coords;
         const key = import.meta.env.VITE_WEATHER_API_KEY;
         const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);

         const entry = {
            ...entryData,
            location: weather.data.name,
            user: user._id,
         }

         const returnedEntry = await createEntry(entry, token);

         fetchEntries(token).then((response) => {
            console.log("Updated entries:", response);
            setEntries([returnedEntry, ...response]);
         })

     });
   };

   if (!user) {
      navigate("/");
   }

   return (
      <div>
         <Header />
         <h2>Welcome, {user.name}!</h2>
         <WeatherWidget />
         <NewEntryForm onSubmit={handleSubmit} />
         <h3>Recent Entries</h3>
         <div>
           <DiaryList entries={entries}/>
         </div>
      </div>
   );
}

export default Dashboard;