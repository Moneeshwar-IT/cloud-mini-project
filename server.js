const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Note = mongoose.model("Note", noteSchema);

app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post("/notes", async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        description: req.body.description
    });

    await newNote.save();

    res.json({
        message: "Note Added Successfully"
    });
});

app.delete("/notes/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);

    res.json({
        message: "Note Deleted"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
