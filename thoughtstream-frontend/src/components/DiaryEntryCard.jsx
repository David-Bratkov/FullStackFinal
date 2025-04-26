/* 
• Displays each diary entry’s:
   Title
   Content
   Creation timestamp
   Weather info (if available)
*/
import React from "react";

function DiaryEntryCard({title, content, creation, weather}){
   return(
      <div>
         <h1>{title}</h1>
         <p>{content}</p>
         <p>Creation Date: {new Date(creation).toDateString()}</p>
         {weather && <p>Weather {weather}</p>}
      </div>

   );
}

export default DiaryEntryCard;