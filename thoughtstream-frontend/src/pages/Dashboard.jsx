import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import DiaryEntryInput from "../components/DiaryEntryInput";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { createEntry, fetchEntries } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchEntryById } from "../services/api";

function Dashboard() {
   const { user, token } = useContext(AuthContext); 
   const [entries, setEntries] = useState([]); 
   const [isVisable, setVisability] = useState(false);
   const navigate = useNavigate();

   // Handle form submission
   const handleSubmit = async (entryData) => {

      // console.log("Entry to be created:", entryData);
      const returnedEntry = await createEntry(entryData, token);

      fetchEntries(token).then((response) => {
         setEntries([returnedEntry, ...response]);
      })
   };

   const updateEntry = async (entryId) => {
      try {
         // Fetch the current entry data

         const entryToUpdate = await fetchEntryById(await entryId, token);
         if (!entryToUpdate) {
            console.error("Entry not found for update:", entryId);
            return;
         }
         console.log("Entry to update:", entryToUpdate); 
      }
      catch (error) {
         console.error("Error updating entry:", error);
      }
   }

   if (!user) {
      navigate("/");
   }

   return (
      <div className="dashboard">
         <Header />
         <div className="main-content">
            <div className="left-panel">
               <WeatherWidget />
               <NewEntryForm onSubmit={handleSubmit} />
         </div>
         {/* { isVisable && <DiaryEntryInput /> }  */}
         <div className="right-panel">
         {/*<h3 className="right-panel-title">Recent Entries</h3> */}
         <div>
           <DiaryList 
           entries={entries}
           updateEntry={updateEntry}
           />
         </div>
         </div>
         </div>
      </div>
   );
}

export default Dashboard;