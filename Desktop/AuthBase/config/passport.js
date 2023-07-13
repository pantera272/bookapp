const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

passport.serializeUser((user, serialize) => {
serialize(null, user);
});

passport.deserializeUser((obj, deserialize) => {
deserialize(null, obj);
});