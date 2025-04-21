import jwt from "jsonwebtoken"; // to allow for token creation and verification
import dotenv from "dotenv";
import Users from "../models/User.js";
import bcrypt from "bcrypt";

dotenv.config(); // Load environment variables


export const authenticateToken = async (req, res, next) => {
   try {
      //take the token from the header
      const token = req.header("Authorization")?.split(" ")[1];

      //check if the token is valid
      if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
      }
    
      //verify the token
      jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) res.status(403).json({ message: "Invalid token" });
        next();
      }); 
   }
   catch (error) {
      res.status(500).json({ message: "Server Error: Unable to authenticate token" });
   }
};

/**
 * @route   POST /auth/login
 * @desc    Registers a new user if they don't exist, or logs in an existing user
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
   try {
      // Get the email and password from the request body
      const { email, password } = req.body;

      // Check if the email and password are provided
      if (!email || !password) {
         return res.status(400).json({ message: "Email and password are required" });
      }

      // Look for the user in the database
      let user = await Users.findOne({ email });
      const hashedPassword = await bcrypt.hash(password, 10);
      if (user) {
         // console.log("DEBUG passed password: ", password, "user: ", user.password);
         
         if (user.password === undefined) {
            //User made the account with google but didnt login locally yet

            user.password = hashedPassword;
            // console.log("DEBUG SAVING THE USER: ", user);
            await user.save();

            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Successfully logged in", accessToken, user });
            // next();
         }
         else {
            // console.log("DEBUG passed password: ", password, "user: ", user.password);

            // If the user exists, check the password
            const compareResult = bcrypt.compare(password, user.password, function(err, result) {
               if (err) {
                  //i dont know what to return for a server error on bcrypt
                  return res.status(500).json({ message: "Server Error: ", err });
               }
               if (result) {
                  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                  return res.status(200).json({ message: "Successfully logged in", accessToken, user });
                  // next();
               } 
               else {
                  return res.status(400).json({ message: "Invalid email or password" });
               }
            });
         }
      }
      else {
         // If the user does not exist, create a new user
         user = new Users({ email, password: hashedPassword });
         await user.save();

         // Generate a JWT token for the new user
         const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
         res.status(201).json({ message: "User registered and logged in successfully", accessToken, user });
      }
   }
   catch (error) {
      res.status(500).json({ message: "Server Error: ", error });
   }
}

export const googleUser = async (req, res, next) => {
   try {
      console.log("req.body: ", req.body);
   }
   catch (error) {
      res.status(500).json({ message: "Server Error: ", error });
   }
}
