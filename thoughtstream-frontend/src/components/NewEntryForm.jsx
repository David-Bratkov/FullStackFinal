import { useState } from "react";

function NewEntryForm({ onSubmit }) {
  const [title, setTitle] = useState(""); // State for the title input
  const [content, setContent] = useState(""); // State for the content textarea
  const [location, setLocation] = useState(""); // State for the location input
  const [reflection, setReflection] = useState(""); // State for the reflection input
  const [tags, setTags] = useState([]); // State for the tags list
  const [tagInput, setTagInput] = useState(""); // State for the tag input field

  const noEmptyFields = () => {
    const errors = [];
    if (!title.trim()) errors.push("title");
    if (!content.trim()) errors.push("content");
    if (!location.trim()) errors.push("location");
    return errors;
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]); // Add the new tag
      setTagInput(""); // Clear the tag input field
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove)); // Remove the tag
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = noEmptyFields();
    if (errors.length === 1) {
      alert(`Please fill out the ${errors.join(", ")} field`);
      return;
    }
    if (errors.length > 1) {
      alert(`Please fill out the ${errors.join(", ")} fields`);
      return;
    }
    onSubmit({ title, content, location, reflection, tags }); // Pass form data to the parent component
    setTitle(""); // Clear the title input after submission
    setContent(""); // Clear the content textarea after submission
    setLocation(""); // Clear the location input after submission
    setReflection(""); // Clear the reflection input after submission
    setTags([]); // Clear the tags list
  };

  return (
    <form className="new-entry-form" onSubmit={handleSubmit}>
      <div className="title-text">
        <label className="input-title-text">
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="title-input"
          />
        </label>
      </div>

      <div className="content-text">
        <label className="input-content-text">
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            className="content-input"
          />
        </label>
      </div>

      <div className="location-text">
        <label className="input-location-text">
          Location:
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="location-input"
          />
        </label>
      </div>

      <div className="location-text">
        <label className="input-location-text">
          Reflection:
          <input
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="(Optional) Enter Reflection"
            className="location-input"
          />
        </label>
      </div>

      <div className="location-text">
         <label className="input-location-text">
         Tags: 
         
            <div className="tags-list">
               {tags.map((tag, index) => (
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
               placeholder="Enter a tag"
               className="location-input"
            />
            <button onClick={handleAddTag} type="button">
               Add
            </button>
         </label>
      </div>

      <button type="submit">Save Entry</button>
    </form>
  );
}

export default NewEntryForm;