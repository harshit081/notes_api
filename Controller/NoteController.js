const NoteModel = require("../models/Notes");

const addNote = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);

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

    if (!note) {
      return res.status(400).json({ message: "Note not created" });
    }

    console.log(note);
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Failed to create note" });
  }
};

const getNote = async (req, res) => {
  try {
    const email = req.params.email;
    const notes = await NoteModel.find({ email: email });

    if (!notes.length) {
      return res.status(404).json({ message: "No notes found" });
    }

    console.log("notes fetched");
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const result = await NoteModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal error" });
  }
};

const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await NoteModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note content:", error);
    res.status(500).json({ message: "Failed to update note content" });
  }
};

const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const { positionX, positionY } = req.body;

    const note = await NoteModel.findByIdAndUpdate(
      id,
      { positionX, positionY },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note position:", error);
    res.status(500).json({ message: "Failed to update note position" });
  }
};

module.exports = {
  getNote,
  addNote,
  updateContent,
  deleteNote,
  updatePosition,
};
