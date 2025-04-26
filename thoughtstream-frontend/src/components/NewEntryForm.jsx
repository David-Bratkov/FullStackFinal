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

   return (
      <form                       
         // onSubmit handler is triggered when the user clicks "Save Entry" or presses Enter
         onSubmit={(e) => {               // e is the event object
         e.preventDefault();              // Prevents default form submission (page reload)
         onSubmit({ title, content });    // Passes form data to the parent component
         setTitle("");                    // Clears the title input after submission
         setContent("");                  // Clears the content textarea after submission
         }}>
         <label> Title:
         <input
            value={title}                 // Binds input value to title state
            onChange={(e) =>              // e.target: element that triggered the event
               setTitle(e.target.value)   // Updates title state with user input
            }
            placeholder="Title"
         />
         </label>
         <label>
         Content:
         <textarea
            value={content}               // Binds textarea value to content state
            onChange={(e) =>              // e.target: element that triggered the event
               setContent(e.target.value) // Updates content state with user input
            }
            placeholder="Write your thoughts..."
         />
         </label>
         <button type="submit">Save Entry</button>
      </form>
   );
}

export default NewEntryForm;