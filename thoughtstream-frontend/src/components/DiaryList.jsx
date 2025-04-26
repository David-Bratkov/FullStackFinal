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

function DiaryList(){
   const [entries, setEntires] = useState([]);
   const {token} = useContext(AuthContext);
   useEffect(() => {
      async function fetchEntries(){
         const res = await api.get("diary");
         setEntires(res.data);
      }
      fetchEntries();
   }, []);
   return(
      <div>
         {entries.map((entry) => (
            <DiaryEntryCard key={entry._id} {... entry} />
         ))}
      </div>
   );
}

export default DiaryList;