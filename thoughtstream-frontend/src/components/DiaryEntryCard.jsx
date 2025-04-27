import React from "react";
import { deleteEntry } from "../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function DiaryEntryCard({id, title, content, creation, weather}){
   const {token} = useContext(AuthContext);
   const [entries, setEntries] = useState([]);

   const deleteEntryHandler = async () => {
      try {
         const returnValue = await deleteEntry(id, token);
         console.log("Entry deleted:", returnValue);

         setEntries((prevEntries) => 
            prevEntries.filter(entry => entry._id !== id)
         );
      } catch (error) {
         console.error("Error deleting entry:", error);
      }
   }
   return(
      <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Created on: {new Date(creation).toLocaleDateString()}</p>
      {weather && (
        <div>
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Location: {weather.location}</p>
        </div>
      )}
      <div>
         <button onClick={deleteEntryHandler}>Delete</button>
         <button >Update WIP</button>
      </div>   
    </div>

   );
}

export default DiaryEntryCard;