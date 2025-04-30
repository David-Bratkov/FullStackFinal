import User from "../models/User.js"; // Import the User model
import bcrypt from "bcrypt"; // For password hashing
import express from "express";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/email", async (req, res) => {
   const { email, password } = req.body;
 
   // Validate input
   if (!email || !password) {
     return res.status(400).json({ success: false, message: "Email and password are required" });
   }
 
   try {
     
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ success: false, message: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const newUser = new User({
         email,
         password: hashedPassword,
      });

      await newUser.save();

      return res.status(201).json({ success: true, message: "Account registered successfully" }); // 201 Created

   } catch (error) {
     console.error("Error in /register route:", error);
     return res.status(500).json({ success: false, message: "Internal server error" }); // 500 Internal Server Error
   }
 });

