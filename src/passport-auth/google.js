require("dotenv").config();
const User = require("../database/schemas/User");
const { Strategy } = require("passport-google-oauth20");

const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/v1/auth/google/redirect",
    scope: ["email"],
};

const verifyFn = async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    try {
        const user = await User.findOne({ $or: [{ authId: profile.id }, { email: profile.emails[0].value }] });
        console.log("Existing User", user);

        if (user) return done(null, user);
        else {
            const newUser = await User.create({
                email: profile.emails[0].value,
                authProvider: "google",
                authId: profile.id,
                displayName: profile.displayName,
                displayPicture: profile.photos[0].value,
            });
            newUser.save();
            console.log("New User ", newUser);
            return done(null, newUser);
        }
    } catch (error) {
        console.log(error);
        return done(error, null);
    }
};

const googleStrategy = new Strategy(strategyOptions, verifyFn);

module.exports = googleStrategy;
