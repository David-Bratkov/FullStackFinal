// File: routes/authRoutes.js
// Defines authentication routes for the ThoughtStream app using Google OAuth2 via Passport.js
import express from "express";
import { handleGoogleLogin } from "../controllers/authController.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";


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

/**
 * @route   POST /api/auth/register
 * @desc    Checks to see if the user email is already registered and if not, creates a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
  
    try {
       const existingUser = await User.findOne({ email });

        // console.log("DEBUG existingUser:", existingUser);

        //hash the password for more security
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {

            console.log("DEBUG existingUser Pass:", existingUser.password);

            if (typeof existingUser.password !== undefined) {
                return res.status(409).json({ success: false, message: "Email already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedUser = {
                ...existingUser,
                password: hashedPassword,
            }

            const result = await User.findByIdAndUpdate(existingUser._id, updatedUser, { new: true });

            console.log("DEBUG updatedUser:", result);
            return res.status(200).json({ success: true, message: "Account updated successfully" });
        }
        else {


            const newUser = new User({
                email,
                password: hashedPassword,
            });
        
            const result = await newUser.updateOne();

            console.log("DEBUG newUser:", result);
        
            return res.status(201).json({ success: true, message: "Account registered successfully" }); // 201 Created
        }
 
    } catch (error) {
      console.error("Error in /register route:", error);
      return res.status(500).json({ success: false, message: "Internal server error" }); // 500 Internal Server Error
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        //compare the encrypted password with the user password
        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        //add logic to connect the user to the JWT authentication

        return res.status(200).json({ success: true, message: "Login successful", userId: user._id });
    } catch (error) {
        console.error("Error in /login route:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;