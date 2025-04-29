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
            //console.log("Fetched entries:", response);
            setEntries(response);
         })
         .catch((error) => {
            if (error) {
               if (error.message === "Request aborted") return;
               console.error("Error fetching entries:", error);
               if (error.response.status === 403) {
                  console.log("Token expired or invalid, redirecting to login");
                  navigate("/");
               }
            }
         });
   }, [entries]);

   const limitedEntries = entries.slice(0,5)

   return (
      <div className="diary-list">
         <p className="diary-list-title">Recent Entries</p>
        {Array.isArray(limitedEntries) && limitedEntries.length > 0 ? (
          limitedEntries.map((entry) => (
            <DiaryEntryCard
              key={entry._id}
              id={entry._id}   // To pass the entry ID for deletion
              title={entry.title}
              content={entry.content}
              creation={entry.createdAt}
              location={entry.location}
              weather={entry.weather} // Pass the weather object
              updateEntry={updateEntry}
              reflection={entry.reflection}
              tags={entry.tags}
            />
          ))
        ) : (
          <p>No diary entries found.</p>
        )}
      </div>
   );
}  

export default DiaryList;