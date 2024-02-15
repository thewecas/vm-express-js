require("dotenv").config();
const passport = require("passport");
const { Strategy } = require("passport-discord");
const DiscordUser = require("../database/schemas/DiscordUser");

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) done(null, user);
    else done(null, false);
});


const discordStrategy = new Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
    scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    try {
        const discord_user = await DiscordUser.findOne({ discordId: profile.id });

        console.log("found user", discord_user);

        if (discord_user) return done(null, discord_user);
        else {
            const newUser = await DiscordUser.create({ discordId: profile.id, username: profile.username, email: profile.email });
            newUser.save();
            console.log("Created User ", newUser);
            return done(null, newUser);
        }
    } catch (error) {
        console.log(error);
        return done(error, null);
    }

});

passport.use(discordStrategy);