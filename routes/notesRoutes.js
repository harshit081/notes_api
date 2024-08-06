const express = require('express');
const router = express.Router();

const {addNote, getNote, deleteNote, updatePosition, updateContent} = require('../Controller/NoteController');


router.post('/create/:email' ,addNote)
router.get('/fetch/:email' ,getNote)
router.delete('/delete/:id' ,deleteNote)
router.put('/updatePosition/:id', updatePosition)
router.put('/updateContent/:id', updateContent)

module.exports = router