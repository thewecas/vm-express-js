const passport = require("passport");
const User = require("../database/schemas/User");

const localStrategy = require("./local");
const googleStrategy = require("./google");
const discordStrategy = require("./discord");

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (user) done(null, user);
    else done(null, false);
});

passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(discordStrategy);
