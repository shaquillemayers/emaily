const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findById(userId);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile.id);

      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log("Existing User:", existingUser);
        return done(null, existingUser);
      }
      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser);
    }
  )
);
