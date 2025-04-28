//DiaryEntry but with the fields as inputs for the user to fill out
import React, { useState, useContext, useEffect } from 'react';
import { createEntry, fetchEntryById } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function DiaryEntryInput({ id }) {
   const {token} = useContext(AuthContext);
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [location, setLocation] = useState("");
   const [weather, setWeather] = useState({});

   useEffect(() => {
      fetchEntryById(id, token)
         .then((response) => {
            console.log("Fetched entry:", response);
            setTitle(response.title);
            setContent(response.content);
            setLocation(response.location);
         })
         .catch((error) => {
            if (error) {
               console.error("Error fetching entries:", error);
               if (error.response.status === 403) {
                  console.log("Token expired or invalid, redirecting to login");
                  navigate("/");
               }
            }
         });
   }, []);

   const cancelUpdate = () => {}

   const completeUpdate = async () => {}

   return (
      <div>
        <h2>
          Title:{" "}
          <input
            type="text"
            value={title} // Controlled input
            onChange={(e) => setTitle(e.target.value)} // Update state on change
          />
        </h2>
        <p>
          Content:{" "}
          <textarea
            value={content} // Controlled textarea
            onChange={(e) => setContent(e.target.value)} // Update state on change
          />
        </p>
        <p>
          Location:{" "}
          <input
            type="text"
            value={location} // Controlled input
            onChange={(e) => setLocation(e.target.value)} // Update state on change
          />
        </p>
        <div>
          <button onClick={cancelUpdate}>Cancel</button>
          <button onClick={completeUpdate}>Submit</button>
        </div>
      </div>

   );

}
export default DiaryEntryInput;