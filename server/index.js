const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, addNote, editNote, getNotes, deleteNote } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
/*-------------*/
app.get("/api/getNotes", getNotes)
app.post("/api/addNote", addNote);
app.put("/api/editNote", editNote);
app.delete("/api/deleteNote/:id", deleteNote)

app.listen(4000, () => console.log("Server running on 4000"));
