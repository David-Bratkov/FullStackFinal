import express from "express";
import {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
} from "../controllers/diaryController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";


const router = express.Router();

/**
 * @route   GET /api/diary
 * @desc    Fetch all diary entries
 * @access  Private (Must be authenticated)
 */
router.get("/", ensureAuthenticated, getAllEntries);

/**
 * @route   GET /api/diary/:id
 * @desc    Fetch a specific diary entry by ID
 * @access  Private (Must be authenticated)
 */
router.get("/:id", ensureAuthenticated, getEntryById);

/**
 * @route   POST /api/diary
 * @desc    Create a new diary entry
 * @access  Private (Must be authenticated)
 */
router.post("/", ensureAuthenticated, createEntry);

/**
 * @route   PUT /api/diary/:id
 * @desc    Update an existing diary entry by ID
 * @access  Private (Must be authenticated)
 */
router.put("/:id", ensureAuthenticated, updateEntry);

/**
 * @route   DELETE /api/diary/:id
 * @desc    Delete a diary entry by ID
 * @access  Private (Must be authenticated)
 */
router.delete("/:id", ensureAuthenticated, deleteEntry);


export default router;
