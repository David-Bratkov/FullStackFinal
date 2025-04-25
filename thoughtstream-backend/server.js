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

app.use("/api/auth", authRoutes);

app.use("/api/diary", diaryRoutes);

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