import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { findOrCreateUser } from "../models/userModel.js"; // modeli çağırdık

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/myblogapp"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const username = email.split("@")[0];
        const googleId = profile.id;

        const user = await findOrCreateUser({ googleId, email, username });
        return done(null, user);
      } catch (err) {
        console.error("Google Strategy Hatası:", err);
        return done(err, null);
      }
    }
  )
);

// Session işlemleri
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
