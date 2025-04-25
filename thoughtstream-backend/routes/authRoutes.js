// File: routes/authRoutes.js
// Defines authentication routes for the ThoughtStream app using Google OAuth2 via Passport.js
import express from "express";
import { handleGoogleLogin } from "../controllers/authController.js";


// Create a new Express router instance
const router = express.Router();

/**
 * @route
 * POST /api/auth/google
 * @desc
 * Handles user login with a Google ID token.
 * The client (React frontend) sends a Google ID token after the user logs in with Google.
 * This token is verified on the server, and if valid, a new signed JWT is returned.
 * 
 */

router.post("/google", handleGoogleLogin); 


/**
* @route
* GET /api/auth/google/callback
* @desc
* Handles the OAuth2 callback from Google after the user logs in and consents.
*
*/
router.get("/google/callback", (req, res) => {

    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send("You are not logged in.");
    }

    res.send("Login successful! Session has been created.");
}
);
    
/**
* @route
* GET /api/auth/logout
* @desc
* Logs the user out by ending the session and clearing session cookies
*
*/
router.get("/logout", (req, res) => {

    // Check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.status(401).send("You are not logged in.");
    }

    // Logout the user and destroy the session
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Logout failed.");
        }
    });
    res.send("Logout successful! Session has been deleted.");
});


/**
* @route
* GET /api/auth/failure
* @desc
* A simple error handler route for failed logins
*
* - This route is shown if the OAuth flow fails (e.g., user denies access or login
* errors)
* - Sends an appropriate HTTP 401 (unauthorized) response
*/
router.get("/failure", (req, res) => {
    res.status(401).send("Login failed");
});

export default router;