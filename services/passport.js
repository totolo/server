const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // this is async request, returning a promise
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a user, call done function, done function takes two parameters, one is the error object which is null for successfully
        // locating an existing user, and the second arg is the existing user object
        return done(null, existingUser);
      }
      // because this is async action as well, so we have to chain our done function after save action.
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
