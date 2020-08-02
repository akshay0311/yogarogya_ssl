const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../instructor/models/User');
const Student = require('../student/models/profile');

var student=0,instructor=0;

module.exports = function(passport) {
  // Instructor Strategy
  passport.use('Instructor',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        instructor = 1;
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );
  // Student Strategy
  passport.use('Student',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Student.findOne({
        email: email
      }).then(user => {

        if (!user) {
          student = 0;
          return done(null, false, { message: 'That email is not registered' });
        }
        student = 1;
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    if (student == 1){
      Student.findById(id, function(err, user) {
        done(err, user);
      });
    }
    if (instructor == 1){
      User.findById(id, function(err, user) {
        done(err, user);
      });
    }
  });
};
