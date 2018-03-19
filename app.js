// require third party modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');

const app = express();

// config
require('./config/config');

// passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');

// use routes
app.use('/auth', auth);

// routes
app.get("/", (req, res) => {
  res.send('It Works!');
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})

// heroku domain name
// https://vast-basin-13285.herokuapp.com/
