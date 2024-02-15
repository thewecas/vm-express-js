require("dotenv").config();
const User = require("../database/schemas/User");
const { Strategy } = require("passport-discord");

const strategyOptions = {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/v1/auth/discord/redirect",
    scope: ["identify"],
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
                email: profile.email,
                authProvider: "discord",
                authId: profile.id,
                displayName: profile.username,
                displayPicture: profile.avatar,
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

const discordStrategy = new Strategy(strategyOptions, verifyFn);

module.exports = discordStrategy;
