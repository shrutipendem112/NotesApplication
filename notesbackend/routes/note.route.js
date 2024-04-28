import express from "express";
import {createNote, deleteNote, getNotes, updateNote} from "../controllers/note.controller.js";

const router = express.Router();

router.route('/')
    .post(createNote)
    .get(getNotes);
router.route('/:noteId').put(updateNote).delete(deleteNote);

export default router;