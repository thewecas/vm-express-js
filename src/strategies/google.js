require("dotenv").config();
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const GoogleUser = require("../database/schemas/GoogleUser");

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const user = await GoogleUser.findById(id);
    if (user) done(null, user);
    else done(null, false);
});



const googleStrategy = new Strategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ['email'],
        callbackURL: 'http://localhost:3001/api/v1/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);

        try {
            const google_user = await GoogleUser.findOne({ googleId: profile.id });

            console.log("found user", google_user);

            if (google_user) return done(null, google_user);
            else {
                const newUser = await GoogleUser.create({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value });
                newUser.save();
                console.log("Created User ", newUser);
                return done(null, newUser);
            }
        } catch (error) {
            console.log(error);
            return done(error, null);
        }

    }
);

passport.use(googleStrategy);