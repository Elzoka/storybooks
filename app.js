// require third party modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

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

// handlebars helpers
const {stripTags, truncate, formatDate, select} = require('./helpers/hbs');

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Handlebars middleware
app.engine('handlebars', exphbs({
  helpers: {
    truncate,
    stripTags,
    formatDate,
    select
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// set static folder
app.use(express.static(__dirname + '/public'));

// load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

// use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})

// heroku domain name
// https://vast-basin-13285.herokuapp.com/
