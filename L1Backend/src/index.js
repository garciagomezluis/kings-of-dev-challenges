const express = require("express");
const app = express();
const users = require("../users.json");
module.exports = app;

//Example endpoint
app.get("/foo", (req, res) => {
  res.send(`foo`);
});

//Write your code here

app.get("/users", (req, res) => {
  const id = req.query?.id;

  let target = users;

  if (typeof id !== "undefined") {
    target = users.filter((user) => user.id === id);
  }

  res.json(target);
});
