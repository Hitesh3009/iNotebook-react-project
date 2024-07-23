const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// Route 1: Hit on the get endpoint /api/note/fetchallnote to get all the saved note(login required)
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const note=await Notes.find({user:req.info.id});
        res.send(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});

// Route 2: Hit on the post endpoint /api/note/addnote to add new note(login required)
router.post('/addnote',fetchuser,[
    body('title','Title length should be atleast 3 characters long').isLength({min:3}),
    body('description','Description length should be atleast 6 characters long').isLength({min:6})
],async (req,res)=>{

    const errors = validationResult(req);
    // Checks whether the error is there or not
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {title, description,tag}=req.body;
    try {
        const note=await Notes({
            title,description,tag,user:req.info.id
        });
        const savedNotes=await note.save();
        res.json(savedNotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});


// Route 3: Hit on the put endpoint /api/note/updatenote/:id to update existing note(login required)
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title, description,tag}=req.body;
    try {

        // Create a new note object
        const newNotes={};
        if (title){newNotes.title=title};
        if (description){newNotes.description=description};
        if (tag){newNotes.tag=tag};

        //Find the note to be updated and update it
        let note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
        if(!note){return res.status(404).send("Not found!")};

        // Allow the user to update the note if he owns the note
        if (note.user.toString()!=req.info.id){
            return res.status(401).send("Not Allowed!");
        }

        // note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
        res.json({note});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});

// Route 4: Hit on the delete endpoint /api/note/deletenote/:id to delete existing note(login required)
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        //Find the note to be updated and update it
        let note=await Notes.findByIdAndDelete(req.params.id);
        if(!note){return res.status(404).send("Not found!")};

        // Allow the user to update the note if he owns the note
        if (note.user.toString()!=req.info.id){
            return res.status(401).send("Not Allowed!");
        }

        // note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
        res.json({"Success":"Note deleted successfully.",note});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});

module.exports = router;