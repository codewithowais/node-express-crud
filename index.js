const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const User = require("./models/user");

const DbURL =
  "mongodb+srv://ketoliy276:VHEcTHWE2cfqVm1y@cluster0.kekoxm8.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DbURL)
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log("users"), res.send("Something went wrong..");
  }
});

app.post("/", async (req, res) => {
  try {
    const userr = await User.create(req.body);
    res.json(userr);
  } catch (error) {
    console.log("users"), res.send("Something went wrong..");
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    res.json(user);
  } catch (error) {
    console.log("users");
    res.send("Something went wrong..");
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send("User Deleted successfully");
  } catch (error) {
    console.log("users"), res.send("Something went wrong..");
  }
});

app.listen(8000, () => {
  console.log(`Server is running on ${8000}`);
});

module.exports = app