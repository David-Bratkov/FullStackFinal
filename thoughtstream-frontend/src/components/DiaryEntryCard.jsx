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

   const noEmptyFields = (entry) => {
      const errors = [];
      if (!entry.title.trim()) errors.push("title");
      if (!entry.content.trim()) errors.push("content");
      if (!entry.location.trim()) errors.push("location");

      return errors;
   }

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
      try{
         const updatedEntry = {
            title: titleEdit,
            content: contentEdit,
            location: locationEdit,
         };

         const errors = noEmptyFields(updatedEntry);
         if(errors.length === 1) {
            alert(`Please fill out the ${errors.join(", ")} field`);
            return;
         }
         if(errors.length > 1) {
            alert(`Please fill out the ${errors.join(", ")} fields`);
            return;
         }

         const response = await updateEntry(id, updatedEntry, token);
         // console.log("Entry updated:", response);

         setEditMode(false);
      } catch (error){
         console.error("Error Updating Entry", error);
      }
   }
   return(
   <div>
      {EditMode ? (
         <div>
            <div>
               <input
               type="text"
               value={titleEdit}
               onChange={(e) => settitleEdit(e.target.value)}
               />
            </div>

            <div>
               <textarea
               value={contentEdit}
               onChange={(e) => setcontentEdit(e.target.value)}
               />
            </div>

            <div>
               <textarea
               value={locationEdit}
               onChange={(e) => setlocationEdit(e.target.value)}
               />
            </div>
               
            <button onClick={saveUpdateHandler}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
         </div>
      ) : (
         <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-content">{content}</p>
            <p className="card-created">Created on: {new Date(creation).toLocaleDateString()}</p>
            {weather && (
            <div>
               <p>Condition: {weather.condition}</p>
               <p>Temperature: {weather.temperature}°C</p>
               <p>Location: {weather.location}</p>
            </div>
            )}
            <div className="card-buttons">
               <button className="card-delete-button" onClick={deleteEntryHandler}>Delete</button>
               <button className="card-update-button" onClick={() => setEditMode(true)}>Update</button>
            </div>
         </div>
      )}
   </div>

   );
}

export default DiaryEntryCard;