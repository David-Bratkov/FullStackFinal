import { useState } from "react";

/**
 * Component: NewEntryForm
 *
 * Renders a form that allows users to create a new diary entry.
 * Takes a prop called onSubmit from the parent component.
 * This is a callback function that will be called when the form is submitted.
 */
function NewEntryForm({ onSubmit }) {
   const [title, setTitle] = useState("");     // State for the title input
   const [content, setContent] = useState(""); // State for the content textarea
   const [location, setLocation] = useState(""); // State for the location input

   const noEmptyFields = () => {
      const errors = [];
      if (!title.trim()) errors.push("title");
      if (!content.trim()) errors.push("content");
      if (!location.trim()) errors.push("location");
      return errors;
   }

   return (
      <form className="new-entry-form"                    
         // onSubmit handler is triggered when the user clicks "Save Entry" or presses Enter
         onSubmit={(e) => {               // e is the event object
            e.preventDefault();              // Prevents default form submission (page reload)
            const errors = noEmptyFields();
            if(errors.length === 1) {
               alert(`Please fill out the ${errors.join(", ")} field`);
               return;
            }
            if(errors.length > 1) {
               alert(`Please fill out the ${errors.join(", ")} fields`);
               return;
            }
            onSubmit({ title, content, location });    // Passes form data to the parent component
            setTitle("");                    // Clears the title input after submission
            setContent("");                  // Clears the content textarea after submission
            setLocation("");                 // Clears the location input after submission
         }}>
         <div className="title-text">
            <label className="input-title-text"> Title:
            <input
               value={title}                 // Binds input value to title state
               onChange={(e) =>              // e.target: element that triggered the event
                  setTitle(e.target.value)   // Updates title state with user input
               }
               placeholder="Title"
               className="title-input"
            />
            </label>
         </div>

         <div className="content-text">
            <label className="input-content-text">
            Content:
            <textarea
               value={content}               // Binds textarea value to content state
               onChange={(e) =>              // e.target: element that triggered the event
                  setContent(e.target.value) // Updates content state with user input
               }
               placeholder="Write your thoughts..."
               className="content-input"
            />
            </label>
         </div>
         
         <div className="location-text">
            <label className="input-location-text">Location:
            <input
               value={location}              // Binds input value to location state
               onChange={(e) =>              // e.target: element that triggered the event
                  setLocation(e.target.value) // Updates location state with user input
               }
               placeholder="Enter Location"
               className="location-input"
            />
            </label>
         </div>

         <button type="submit">Save Entry</button>
      </form>
   );
}

export default NewEntryForm;