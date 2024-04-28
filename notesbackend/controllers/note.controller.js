import Note from "../models/note.models.js";
import asyncHandler from "express-async-handler"

const createNote = asyncHandler(
    async (req, res) => {
        try {
            const {title,content} = req.body;
            if(title && content){
                const newNote = new Note({
                    title: title,
                    content: content,
                })
                await newNote.save();
                console.log(newNote);    
                res.json({
                    code: 200,
                    remark: "Note created"
                })
            }
            else{
                res.status(400);
                res.json({
                    code: 400,
                    remark: "title and content is required"
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                code: 500,
                remark: "Failed!",
            })
        }
    }
)

const getNotes = asyncHandler(
    async (req,res) => {
        try {
            const filterObj = req.query.search?{
                title: {
                    $regex: req.query.search,
                    $options: 'i',
                }
            }: {};
            const notes = await Note.find(filterObj);
            res.json({
                code: 200,
                remark: 'Successful',
                data: notes,
            })
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                code: 500,
                remark: "Failed!",
            })
        }
    }
)

const updateNote = asyncHandler(
    async(req, res) => {
        try {
            const noteId = req.params.noteId;
            const note = await Note.findById(noteId);
            if(note){
                const {title,content, archivedToggle} = req.body;
                note.title = title || note.title;
                note.content = content || note.content;
                note.isArchived = archivedToggle;
                
                await note.save();
                res.json({
                    code: 200,
                    remark: "Note Updated"
                })
            }else{
                res.status(404);
                res.json({
                    code: 404,
                    remark: "Not Found"
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                code: 500,
                remark: "Failed!",
            })
        }
    })

const deleteNote = asyncHandler(
    async(req, res) => {
        try {
            const noteId = req.params.noteId;
            const note = await Note.findByIdAndDelete(noteId);
            res.json({
                    code: 200,
                    remark: "Note deleted"
                })
        } catch (error) {
            console.log(error);
                res.status(500);
                res.json({
                    code: 500,
                    remark: "Failed!",
                })
        }
    }
)    

export {createNote, getNotes, updateNote, deleteNote};