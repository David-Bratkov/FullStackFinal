import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import DiaryEntryCard from "../components/DiaryEntryCard";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import api from "../services/api";

function Dashboard() {
   const { user } = useContext(AuthContext); 
   const [entries, setEntries] = useState([]); 

   // Handle form submission
   const handleSubmit = (entryData) => {
      console.log(entryData);
      setEntries([entryData, ...entries]); 
      console.log("ENTRIES",entries);  // Check the updated state
     // api.post("/api/diary", entries);
   };

   if (!user) {
      return <p>Please Log In</p>;
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