import mongoose from "mongoose";
import bcrypt from "bcrypt"; // used for hashing passwords
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
   googleId: { type: String, 
      required: function() {return !this.password},//requires googleId if password is not provided
      unique: true },
   name: String,
   email: { type: String, unique: true, required: true }, 
   picture: String,
   password: String,
   }, { timestamps: true });

   userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) {
         return next();
      }
   
      try {
         const salt = await bcrypt.genSalt(10);
         this.password = bcrypt.hash(this.password, salt);
         next();
      } catch (error) {
         console.log("Error hashing password:", error);
         next(error);
      }
   });
    

/**
 * Create the Users model based on the schema
 */
export default mongoose.model("User", userSchema);
/**
 * Export the Users Mongoose model for database operations
 *
 * Usage:
 * import Users from "../models/User.js";
 *
 */
