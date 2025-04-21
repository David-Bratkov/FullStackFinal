1. Overview
-Describe the feature goal for ThoughStream Part 2 

The goal was to have authentitcation with google oauth and get the cookie setup in postman so whenever you call the routes it will check that cookie first if you are authorized before allowing you to do anything. this also implemented local diarys for each user instead of everything being global for all users.

- What type of authentication did you implement and why? 

I implemented google oauth authentication because it was required by the write up and I also implemented local authentication where it will output a JWT token that can be used to authorize (not implemented yet)

- Explain how the authentication will change once you have a front-end 

These will change when i implement the front end because local will need to call a register route and there will need to be checks to see if that user exists already which i havent done yet. 

- Describe the packages and middleware that you used and why

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
import bcrypt from "bcrypt"; // used for hashing passwords
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Import the Google OAuth2 strategy and rename it for clarity
import jwt from "jsonwebtoken"; // to allow for token creation and verification

2. Google Cloud Console Workflow
- Fully outline the process of enabling your third-party Client ID with Google

   1. Visit the Google Cloud Console: https://cloud.google.com/cloud-console
   2. Create a new project
   3. Go to APIs & Services > Credentials
   4. Click Create Credentials > OAuth client ID
      Application type: Web application
      Authorized redirect URI: http://localhost:5000/auth/google/callback
   5. Copy the generated Client ID and Client Secret.

- Describe what OAuth2 

Oauth2 is a common standard to help speed up the login flow for many services it also allows for a way to login without a password sent through to the program so it has a security side to it.

3. Authentication Flow Description
-Describe what happens during the login process

When you login you call GET /auth/google
which redirects your browser to a Google OAuth screen where you can login or use a already logged in google account
After this step it will call GET /auth/google/callback where it will go if the user succeeds or fails logging in
if the user fails logging in they will be redirected to /auth/failure where it would send a 401 "Login failed" message
if the user suceeds then it would call passport.use middleware in passport.js where it would do all the middleware logic and it will signify its done by calling done function then it would spit out the message "Login successful! Session has been created." with a code of 200. This will set a cookie in the browser with the token used for authentication

4. Environment Variables
- List all the environment variable names that are needed your project

MONGO_URI: the URI to the mongodb that the program will use
WEATHER_API_KEY: Your Weather API key to fetch weather
data to add to the diary
PORT: A free port to run the application
JWT_SECRET: A secret key to hash JWT tokens
GOOGLE_CLIENT_ID: the google id for the oauth you have setup
GOOGLE_CLIENT_SECRET: the secred code for the oauth you have setup
GOOGLE_CALLBACK_URL: the url you have setup in the oauth this project uses
http://localhost:5000/auth/google/callback
SESSION_SECRET: this allows the server to verify that the cookie was not altered by the client.

5. Mongoose Models and Schema Changes
- Describe the Mongoose models you are using for ThoughtStream

User: The model that is reffered to when creating or updating a user, these fields have a requirement for email and also a requirement for googleid if the user has no password passed
DiaryEntry: This model is used when creating a new diary where it stores all the users diary information and addintional weather data based on the location given

- How are your documents (e.g., User and DiaryEntry) refer to or know about each other

The User model does not refer to the DiaryEntry model but the DiaryEntry model refers to the User model by the "_id" field that is auto generated when a new user is created

6. Route Protection
- Explain how you protected routes using the middleware.

By putting the middleware function in the routes so it goes through that function first before its own function.

- What does ensureAuthenticated do?

checks req.isAuthenticated() if true then continues on by calling next and throws a 401 code with message "Unauthorized, update your cookie!"

- How is it used in your routes?

By putting it before the route's function call so it gets called before the main function executes (see diaryController.js for more details)

7. Logout Route

- Document how you implemented the logout feature

created a function that gets called, that just calls logout on the req object

- What route is used?

   GET /auth/logout

- What happens when a user logs out?

   It invalidates the cookie for that user so they wont be allowed to send HTTP requests until they login again

8. Testing Strategies

- Describe step-by-step how you tested your login and protected routes using Postman. You must include the following:

   1. How to complete the login in the browser
      follow the url sent in the console http://localhost:5000/auth/google and login with your google account

   2. How to get the connect.sid cookie from browser dev tools
      open up dev tools on your browser find the storage tab in the menu then find cookies and copy the value in connect.sid

   3. How to add the cookie in Postman
      under the BIG BLUE send button there is a little blue cookie text, you press on that and add a domain (localhost) cookies then add a specific cookie for that domain it would have a internal value such as "Cookie_1=value;" you change it to "connect.sid=<value>" you input the value you copied from the browser after the equals sign and lave the rest of the cookie alone

   4. Example request to a protected route
      GET /api/diary

   5. What happens when the cookie is missing
      it will go to the middleware function first then detect the cookie is not valid and then sends a 401 error saying "Unauthorized, update your cookie!"

(examples in photos folder)

9. Known Issues or Future Improvements
- Mention anything that didn’t work as expected, or ideas for improvement
   I had some inital struggle figuring out how cookies work on postman and then after having to login to google OAuth EVERY SINGLE TIME I PRESS ctrl+s on the program which I do a whole lot was very annoying. But other then that it was very smooth on the setup and the write up was good. The other issue is based off the extra credit i decided to do which is have the user accounts work with both OAuth and local logins, it had some conflict with the database because one had google id and the other didnt. I learned you can throw functions on the model which made the google id required or not depending on what you send which might cause a security risk in a real program but i still wanted to have that work. I want to have further development on having the cookie and or JWT token but i decided to leave it alone for now since its almost due and i have other homework but this project was fun.

Setup Instructions:
(Have node installed)
(Setup all enviromental variables in a .env file)
npm install
npm start

API Usage Guide:
Get /
Responses:
   Success (200): "Welcome to ThoughtStream API"
   Error (500): "Server Error"

GET /api/diary/
Responses:
   Success (200): Returns all diary entries
   Error (500): "Server Error: Unable to fetch diary entries"
   Error (401): "Unauthorized, update your cookie!"
   Error (500): "Error in authentication middleware"

GET /api/diary/:id
Responses:
   Success (200): Returns that specific diary
   Error (404): "Diary entry not found"
   Error (400): "Server Error: Unable to retrieve diary entry"
   Error (401): "Unauthorized, update your cookie!"
   Error (500): "Error in authentication middleware"

POST /api/diary
Responses:
   Success (200): The updated diary
   Error (404): "Diary entry not found"
   Error (500): "Server Error: Unable to update diary entry"
   Error (401): "Unauthorized, update your cookie!"
   Error (500): "Error in authentication middleware"

DELETE /api/diary/:id
Responses:
   Success (200): "Diary entry id deleted successfully"
   Error (404): "Diary entry id not found"
   Error (500): "Server Error: Unable to delete diary entry"
   Error (401): "Unauthorized, update your cookie!"
   Error (500): "Error in authentication middleware"

API Testing Results
in ./photos/

Extra Credit:
implemented local login with JWT token generation, password hashing and made it compatible with the existing OAuth users 

Git Commit History
in ./photos/