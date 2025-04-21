/**
* @file server.js
* @description Main entry point for the ThoughtStream API.
* Initializes Express, connects to MongoDB, sets up middleware,
* and defines API routes.
*/

import express from "express"; // Web framework for Node.js
import dotenv from "dotenv"; // Loads environment variables from .env file
import cors from "cors"; // Enables Cross-Origin Resource Sharing
import connectDB from "./config/db.js"; // Database connection function
import diaryRoutes from "./routes/diaryRoutes.js"; // API routes for app
import authRoutes from "./routes/authRoutes.js"; // API routes for authentication
import session from "express-session"; // Middleware to manage sessions
import passport from "passport"; // Authentication framework
import cookieParser from "cookie-parser"; // Parses cookies from incoming HTTP requests
import "./config/passport.js"; // Loads Passport strategy and session serialization logic

// Load environment variables
dotenv.config();


// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Use Express Middleware to parse JSON requests
app.use(express.json());

// Use Cors in the App
app.use(cors());


// Parses cookies attached to incoming requests.
// Required by express-session to read the session ID from the cookie.
app.use(cookieParser());
/**
* Configures session management using express-session. This middleware
* stores session data on the server and issues a session ID cookie
* to the client (e.g., connect.sid). This cookie (s:<sessionId>.<hmac>)
* contains a session ID and a HMAC for integrity verification.
*
* The HMAC (Hash-based Message Authentication Code) is generated using the
* SESSION_SECRET and allows the server to verify that the cookie was not
* altered by the client. If the cookie is tampered with, verification fails
* and the session is invalidated.
*
* Generate a 32-byte secure secret using OpenSSL, an open source
* cryptographic toolkit and library (https://www.openssl.org/):
*
openssl rand -hex 32
* Store the 64-char hex string in your .env file as SESSION_SECRET.
*/
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));

// Initializes Passport middleware. This must come after session middleware
// so Passport can access session data.
app.use(passport.initialize());

// Enables persistent login sessions with Passport.It integrates with
// express-session and makes req.user available for authenticated users.
app.use(passport.session());

app.use("/api/diary", diaryRoutes);

app.use("/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
   try {
      res.send("Welcome to ThoughtStream API");
   } catch (error) {
      res.status(500).json({ message: "Server Error" });
   }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

console.log("Login with Google at: http://localhost:5000/auth/google");