const express = require("express");
const mongoose = require("mongoose");
const connectToDatabase = require("./dbConnect");
const path = require("path");
const methodOverride = require("method-override")
const app = express();

const Chat = require("./models/chat");

// Set the views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// Middleware for parsing JSON
app.use(express.json());

// Connect to the database
mongoose.set("strictQuery", false);
connectToDatabase().then(() => {
  console.log("Connected to the database");
});

// Define a root route
app.get("/", (req, res) => {
  res.send("Root is working");
});

// Index Route
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  try {
    await newChat.save();
    console.log("Chat was saved");
    res.redirect("/chats");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// edit Route
app.get("/chats/:id/edit", async (req, res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs", {chat});
})

// Update Route
app.put("/chats/:id",async (req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
id, { msg: newMsg },
{ runValidators: true, new: true }
    )
    console.log(updatedChat);
    res.redirect("/chats")
})

// Delete Route
app.delete("/chats/:id", async (req, res) =>{
  let {id} = req.params;
  let chatDeleted = await Chat.findByIdAndDelete(id);
  res.redirect("/chats")
})

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

module.exports = app;
