// services/api.js

// Import Axios for making HTTP requests
import axios from "axios";

// Import your utility function that retrieves the stored authentication token (JWT)
import { getAuthToken } from "../utils/auth";

/**
* Create a customized Axios instance for communicating with the backend API.
*
* The baseURL is loaded from an environment variable using Vite’s import.meta.env
* This allows for easy switching between development and production servers.
*
*/
const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
* Request Interceptor
*
* This function runs before every outgoing HTTP request made through the api
* instance. It automatically adds an Authorization header with the JWT token if
* one exists.
*
* The token is expected to be stored (e.g., in localStorage) and retrieved using
* getAuthToken().
*
* Format of the header:
*  Authorization: Bearer <token>
*
* This ensures all authenticated API requests include the necessary credentials
* without repeating code.
*/
api.interceptors.request.use((config) => {
   const token = getAuthToken();
   if (token) {
      // Attach the token to the Authorization header if it exists
      config.headers.Authorization = `Bearer ${token}`;
   }
   // Return the updated config to proceed with the request
   return config;
});

// Example: GET request to fetch diary entries
export async function fetchEntries(token) {
   try {

      // console.log(`API DEBUG: Base URL is ${import.meta.env.VITE_API_BASE_URL}`);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/diary`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return res.data; // Array of entries
   } catch (err) {
      // console.error("error fetching entries:", err);
      throw err;
   }
}

export async function fetchEntryById(entryId, token) {
   try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/diary/${entryId}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return res.data; // Single entry
   } catch (err) {
      console.error("error fetching entry by ID:", err);
      throw err;
   }
}

export async function createEntry(entryData, token) {
   try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/diary`, entryData, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return res.data; // Newly created entry
   } catch (err) {
      // console.error("error creating entry:", err);
      throw err;
   }
}

export async function updateEntry(entryId, entryData, token) {
   console.log("DEBUG entryData to update:", entryData);
   try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/diary/${entryId}`, entryData, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return res.data; // Updated entry
   }
   catch (err) {
      // console.error("error updating entry:", err);
      throw err;
   }
}

export async function deleteEntry(entryId, token) {

   console.log("DEBUG Deleting entry with ID:", entryId);
   // console.log("DEBUG Using token:", token);
   try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/diary/${entryId}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return res.data; // Response from the delete operation
   } catch (err) {
      // console.error("error deleting entry:", err);
      throw err;
   }
}

/**
* Export the configured Axios instance
*
* This can now be used throughout your React app to make secure API calls.
* Example usage:
* api.get("/diary") or api.post("/diary", { title, content })
*/
export default api;