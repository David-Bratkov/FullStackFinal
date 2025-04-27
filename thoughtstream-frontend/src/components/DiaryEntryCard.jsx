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
      <h2>{title}</h2>
      <p>{content}</p>
      {weather && (
        <div>
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Location: {weather.location}</p>
        </div>
      )}
    </div>

   );
}

export default DiaryEntryCard;