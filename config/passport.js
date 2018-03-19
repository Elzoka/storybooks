const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const googleClientID = process.env.googleClientID || require('./keys').googleClientID;
const googleClientSecret =  process.env.googleClientSecret || require('./keys').googleClientSecret;

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy({
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
    })
  )
}
