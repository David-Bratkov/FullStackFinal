import React from "react";
import { deleteEntry, updateEntry } from "../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function DiaryEntryCard({id, title, location, reflection, content, creation, weather, tags}) {
   const {token} = useContext(AuthContext);
   const [entries, setEntries] = useState([]);
   const [titleEdit, settitleEdit] = useState(title);
   const [contentEdit, setcontentEdit] = useState(content);
   const [EditMode, setEditMode] = useState(false);
   const [locationEdit, setlocationEdit] = useState(location);
   const [reflectionEdit, setreflectionEdit] = useState(reflection);
   const [tagsEdit, setTags] = useState(tags);
   const [tagInput, setTagInput] = useState("")

   const noEmptyFields = (entry) => {
      const errors = [];
      if (!entry.title.trim()) errors.push("title");
      if (!entry.content.trim()) errors.push("content");
      if (!entry.location.trim()) errors.push("location");
      return errors;
   }

   const handleAddTag = (e) => {
      e.preventDefault();
      if (tagInput.trim() && !tagsEdit.includes(tagInput.trim())) {
        setTags((prevTags) => [...prevTags, tagInput.trim()]); // Add the new tag
        setTagInput(""); // Clear the tag input field
      }
    };
  
    const handleRemoveTag = (tagToRemove) => {
      setTags((prevTags) => 
         prevTags.filter((tag) => 
         tag !== tagToRemove)); // Remove the tag
    };

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
            reflection: reflectionEdit,
            tags: tagsEdit,
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
         console.log("Entry updated:", response);

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
               className="location-input"
               type="text"
               value={titleEdit}
               onChange={(e) => settitleEdit(e.target.value)}
               />
            </div>

            <div>
               <textarea
               className="location-input"
               value={contentEdit}
               onChange={(e) => setcontentEdit(e.target.value)}
               />
            </div>

            <div>
               <textarea
               className="location-input"
               value={locationEdit}
               onChange={(e) => setlocationEdit(e.target.value)}
               />
            </div>

            <div>
               <textarea
               className="location-input"
               value={reflectionEdit}
               onChange={(e) => setreflectionEdit(e.target.value)}
               />
            </div>

            <div className="location-text">
               <label className="input-location-text">
               Tags: 
               
                  <div className="tags-list">
                     {tagsEdit.map((tag, index) => (
                        <span
                        key={index}
                        className="tag-item"
                        onClick={() => handleRemoveTag(tag)}
                        >
                        {tag} &times;
                        </span>
                     ))}
                  </div>
                  <input
                     value={tagInput}
                     onChange={(e) => setTagInput(e.target.value)}
                     placeholder="Enter a tag and press Add"
                     className="location-input"
                  />
                  <button onClick={handleAddTag} type="button">
                     Add
                  </button>
               </label>
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
            {reflection && <p className="card-reflection">{reflection}</p>}
            {tagsEdit && tagsEdit.length > 0 && (
               <div className="tags-list">
                  {tagsEdit.map((tag, index) => (
                  <span key={index} className="tag-item">
                     {tag}
                  </span>
                  ))}
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