const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const googleClientID = process.env.googleClientID || require('./keys').googleClientID;
const googleClientSecret =  process.env.googleClientSecret || require('./keys').googleClientSecret;
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy({
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      const newUser = {
        googleID: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: image
      }
      User.findOne({googleID: profile.id})
        .then(user => {
          if(user){
            done(null, user);
          }else{
            new User(newUser)
              .save()
              .then(user => done(null, user));
          }
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
}
