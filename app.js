// config
require('./config/config');

// require third party modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// routes
app.get("/", (req, res) => {
  res.send('It Works!');
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})
