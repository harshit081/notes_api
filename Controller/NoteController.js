const NoteModel = require("../models/Notes");

const addNote = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email)

    const { group, color, title, content, positionX, positionY } = req.body;
    const note = await NoteModel.create({
      email,
      group,
      color,
      title,
      content,
      positionX,
      positionY,
    });
    if(!note){
        return res.json("Note not created")
    }
    console.log(note);
    res.json(note);
  } catch (error) {
    console.log(error);
  }
};
const getNote = async (req, res) => {
  try {
    const email = req.params.email;
    const notes = await NoteModel.find({ email: email });
    console.log("notes fetched");
    res.json(notes);
  } catch (error) {
    console.log("notes failed to fetch");
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params.id;
    console.log(id)
    const result = await NoteModel.findByIdAndDelete({ _id: id });
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.json({ message: "Internal error" });
  }
};

const updateContent = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { title, content } = req.body;
    const note = await NoteModel.findByIdAndUpdate(
      id,
      { title: title, content: content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.log("note failed to update");
    res.json({ message: error.message });
  }
};
const updatePosition = async (req, res) => {
  try {
    const { id } = req.params.id;
    console.log(id);
    const { positionX, positionY } = req.body;
    const note = await NoteModel.findByIdAndUpdate(
        id,
      { positionX: positionX, positionY: positionY },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.log("note failed to update");
    res.json({ message: error.message });
  }
};

module.exports = {
  getNote,
  addNote,
  updateContent,
  deleteNote,
  updatePosition,
};
