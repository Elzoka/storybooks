// require third party modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const exphbs = require('express-handlebars');

// custom modules
const User = require('./models/User');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// config
require('./config/config');

// passport config
require('./config/passport')(passport);

// connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
      console.log("Connected to MongoDB!");
  })
  .catch(err => console.log(err));

// cookieParser and session middleware
app.use(cookieParser());
app.use(session({
  secret: 'this is a big secret so do not tell anyone',
  resave: false,
  saveUninitialized: false
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next();
})

// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// load routes
const auth = require('./routes/auth');
const index = require('./routes/index');

// use routes
app.use('/auth', auth);
app.use('/', index);

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})

// heroku domain name
// https://vast-basin-13285.herokuapp.com/
