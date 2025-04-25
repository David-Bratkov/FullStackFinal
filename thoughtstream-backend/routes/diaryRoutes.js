import express from "express";
import {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
} from "../controllers/diaryController.js";
import authenticateJWT from "../middleware/authMiddleware.js";


const router = express.Router();

/**
 * @route   GET /api/diary
 * @desc    Fetch all diary entries
 * @access  Private (Must be authenticated)
 */
router.get("/", authenticateJWT, getAllEntries);

/**
 * @route   GET /api/diary/:id
 * @desc    Fetch a specific diary entry by ID
 * @access  Private (Must be authenticated)
 */
router.get("/:id", authenticateJWT, getEntryById);

/**
 * @route   POST /api/diary
 * @desc    Create a new diary entry
 * @access  Private (Must be authenticated)
 */
router.post("/", authenticateJWT, createEntry);

/**
 * @route   PUT /api/diary/:id
 * @desc    Update an existing diary entry by ID
 * @access  Private (Must be authenticated)
 */
router.put("/:id", authenticateJWT, updateEntry);

/**
 * @route   DELETE /api/diary/:id
 * @desc    Delete a diary entry by ID
 * @access  Private (Must be authenticated)
 */
router.delete("/:id", authenticateJWT, deleteEntry);


export default router;
