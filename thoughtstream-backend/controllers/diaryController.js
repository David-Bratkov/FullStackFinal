import DiaryEntry from "../models/DiaryEntry.js";
import { fetchWeather } from "./weatherController.js";

/**
 * @route   GET /api/diary
 * @desc    Fetch all diary entries with optional filters
 * @access  Private
 */
export const getAllEntries = async (req, res) => {
   try {
         const { search, tag, location } = req.query;
         let filter = { user: req.user.userId };

         // Search filter (Matches title or content)
         if (search) {
            filter.$or = [
               { title: { $regex: search, $options: "i" } },
               { content: { $regex: search, $options: "i" } }
            ];
         }

         // Tag filter (Exact match)
         if (tag) {
            filter.tags = tag;
         }

         // Location filter (Exact match)
         if (location) {
            filter.location = location;
         }

         // Fetch filtered results and sort by newest first
         const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
         res.status(200).json(entries);
   } catch (error) {
         res.status(500).json({ message: "Server Error: Unable to fetch diary entries" });
   }
};

/**
* @route   GET /api/diary/:id
* @desc    Fetch a single diary entry by ID
* @access  Private
*/
export const getEntryById = async (req, res) => {
   try {
      const entry = await DiaryEntry.findById(req.user.userId);

      if (!entry) {
         return res.status(404).json({ message: "Diary entry not found" });
      }

      if (entry.user.toString() !== req.user._id.toString()) {
         return res.status(403).json({ message: "Forbidden" });
      }

      res.status(200).json(entry);
   } catch (error) {
      res.status(400).json({ message: "Server Error: Unable to retrieve diary entry", error });
   }
};



/**
* @route POST /api/diary
* @desc Create a new diary entry
* @access Private
*
*/
export const createEntry = async (req, res) => {
   try {
      const { title, content, reflection, tags, location } = req.body;
         
         // Fetch weather data if location is provided
         const weatherData = location ? await fetchWeather(location) : null;
         
         // console.log(JSON.stringify(weatherData));

         const newEntry = new DiaryEntry({
            user: req.user.id,
            title,
            content,
            reflection,
            tags,
            location,
            weather: weatherData,
         });
      await newEntry.save();
      res.status(201).json(newEntry);
   } catch (error) {
      res.status(400).json({ message: "Server Error: Unable to create diary entry" });
   }
};

/**
* @route PUT /api/diary/:id
* @desc Update an existing diary entry
* @access Private
*/
export const updateEntry = async (req, res) => {
   try {
      const { id } = req.params;
      const { title, content, reflection, tags, location } = req.body;

      //makeing a new object to overwrite the existing entry
      const updateData = {
         title,
         content,
         reflection,
         tags,
         location,
      };

      // Update weather data if location is provided
      if (location) {
         updateData.weather = await fetchWeather(location);
      }

      const oldEntry = await DiaryEntry.findById(id);

      if (oldEntry.user.toString() !== req.user._id.toString()) {
         return res.status(403).json({ message: "Forbidden" });
      }

      // Find the diary entry by ID and update it
      const updatedEntry = await DiaryEntry.findByIdAndUpdate(id, updateData, 
         { new: true });

      if (!updatedEntry) {
         return res.status(404).json({ message: "Diary entry not found" });
      }

      res.status(200).json(updatedEntry);
   } catch (error) {
      res.status(500).json({ message: "Server Error: Unable to update diary entry" });
   }
};

/**
* @route DELETE /api/diary/:id
* @desc Delete a diary entry
* @access Private
*/
export const deleteEntry = async (req, res) => {
   try {

      const entry = await DiaryEntry.findById(req.params.id);

      if (!entry) {
         return res.status(404).json({ message: "Diary entry not found" });
      }

      // Check if the user is authorized to delete the entry
      if (entry.user.toString() !== req.user._id.toString()) {
         return res.status(403).json({ message: "Forbidden" });
      }

      // Find the diary entry by ID and delete it
      await DiaryEntry.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: `Diary entry ${req.params.id} deleted successfully` });


   } catch (error) {
      res.status(500).json({ message: "Server Error: Unable to delete diary entry" , error });
   }
};
