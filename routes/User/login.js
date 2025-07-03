const User = require("../../models/UserSchema");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express.Router();

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
      .populate("blogs")
      .lean();

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(404)
        .send({ Message: "Incorrect Password", Success: false });
    }

    return res.send({
      Message: "User Authenticated",
      User: {
        username: user.username,
        email: user.email,
        blogs: user.blogs,
        _id: user._id,
      },
      Success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({
        Message: "Error occured at /login route",
        Error: error.message,
        Success: false,
      });
  }
});

module.exports = app;
