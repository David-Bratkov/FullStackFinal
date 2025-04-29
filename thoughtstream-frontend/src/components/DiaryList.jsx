/* 
• This component will:
   Fetch all entries from the backend via GET
   Use the JWT token for authorization
   Display a list of entries using the DiaryEntryCard component
*/
import React, {useContext, useEffect, useState} from "react";
import DiaryEntryCard from "./DiaryEntryCard";
import { AuthContext } from "../context/AuthContext";
import { fetchEntries } from "../services/api"; 
import { useNavigate } from "react-router-dom";

function DiaryList(updateEntry){
   const [entries, setEntries] = useState([]);
   const {token} = useContext(AuthContext);
   const navigate = useNavigate();

   // console.log("Passed updateEntry function:", updateEntry);

   useEffect(() => {
      fetchEntries(token)
         .then((response) => {
            // console.log("Fetched entries:", response);
            setEntries(response);
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
   }, [entries]);

   return (
      <div>
        {Array.isArray(entries) && entries.length > 0 ? (
          entries.map((entry) => (
            <DiaryEntryCard
              key={entry._id}
              id={entry._id}   // To pass the entry ID for deletion
              title={entry.title}
              content={entry.content}
              creation={entry.createdAt}
              location={entry.location}
              weather={entry.weather} // Pass the weather object
              updateEntry={updateEntry}
            />
          ))
        ) : (
          <p>No diary entries found.</p>
        )}
      </div>
   );
}  

export default DiaryList;