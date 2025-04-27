/* 
• This component will:
   Fetch all entries from the backend via GET
   Use the JWT token for authorization
   Display a list of entries using the DiaryEntryCard component
*/
import React, {useContext, useEffect, useState} from "react";
import DiaryEntryCard from "./DiaryEntryCard";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { fetchEntries } from "../services/api"; 

function DiaryList(){
   const [entries, setEntires] = useState([]);
   const {token} = useContext(AuthContext);
   useEffect(() => {
      fetchEntries(token)
         .then((response) => {
            console.log("Fetched entries:", response.data);
            setEntires(response.data);
         })
         .catch((error) => {
            console.error("Error fetching entries:", error);
         });
   }, []);
   return(
      <div>
         {entries.map((entry) => ( //entries is undefined
            <DiaryEntryCard key={entry._id} {... entry} />
         ))}
      </div>
   );
}

export default DiaryList;