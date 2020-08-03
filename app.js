const express = require('express');
var hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var path = require('path');
const app = express();
const fs = require('fs');
var multer = require("multer");
const bodyParser = require("body-parser");
const User = require('./instructor/models/User.js');
const Profile = require('./student/models/profile.js');






// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// express-handlebar
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


// static folder
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.urlencoded({extended: true}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes for instructors
app.use('/', require('./instructor/routes/index.js'));
app.use('/users', require('./instructor/routes/users.js'));


//Routes for students
app.use('/student', require('./student/routes/profile'));

//Routes for packages
app.use('/package', require('./student/routes/package'));



const PORT = process.env.PORT || 5004;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
