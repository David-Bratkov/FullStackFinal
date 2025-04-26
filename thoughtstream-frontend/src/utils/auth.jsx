/**
 * Retrieves the JWT token from the environment variables.
 * @returns {string} The JWT token from the .env file.
 */
export function getAuthToken() {
   return import.meta.env.VITE_JWT_TOKEN; // Replace VITE_JWT_TOKEN with the actual key in your .env file
}

export default getAuthToken;

