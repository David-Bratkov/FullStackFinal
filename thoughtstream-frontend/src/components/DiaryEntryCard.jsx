import React from "react";
import { deleteEntry, updateEntry } from "../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function DiaryEntryCard({id, title, location, temperature, condition,content, creation, weather}) {
   const {token} = useContext(AuthContext);
   const [entries, setEntries] = useState([]);
   const [titleEdit, settitleEdit] = useState(title);
   const [contentEdit, setcontentEdit] = useState(content);
   const [EditMode, setEditMode] = useState(false);
   const [locationEdit, setlocationEdit] = useState(location);
   const [conditionEdit, setconditionEdit] = useState(condition);
   const [temperatureEdit, settemperatureEdit] = useState(temperature);
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
   const saveUpdateHandler = async () => {
      console.log("SAVEUPDATE RUNNING");
      try{
         const updatedEntry = {
            title: titleEdit,
            content: contentEdit,
            location: locationEdit,
            weather: weather,
         };
         console.log("NOW Updating entry with data:", updatedEntry);
         const response = await updateEntry(id, updatedEntry, token);
         // console.log("Entry updated:", response);

         setEditMode(false);
      } catch (error){
         console.error("Error Updating Entry", error);
      }
   }
   return(
      <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Location: {location}</p>
      <p>Temperature: {temperature}</p>
      <p>Condition: {condition}</p>
      <p>Created on: {new Date(creation).toLocaleDateString()}</p>
      {weather && (
        <div>
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Location: {weather.location}</p>
        </div>
      )}
      <button onClick={deleteEntryHandler}>Delete</button>
      <div>
    {EditMode ? (
      <div>
        <input
          type="text"
          value={titleEdit}
          onChange={(e) => settitleEdit(e.target.value)}
         />
        <textarea
          value={contentEdit}
          onChange={(e) => setcontentEdit(e.target.value)}
         />
         <textarea
            value={locationEdit}
            onChange={(e) => setlocationEdit(e.target.value)}
            />
        <button onClick={saveUpdateHandler}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
      ) : (
      <div>
        <button onClick={() => setEditMode(true)}>Update</button>
      </div>
      )}
      </div>
   </div>

   );
}

export default DiaryEntryCard;