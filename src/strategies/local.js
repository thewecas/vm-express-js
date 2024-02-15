const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../database/schemas/User");
const { comparePassword } = require("../utils/helper");


passport.serializeUser((user, done) => {
	done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	if (user) done(null, user);
	else done(null, false);
});



const localStrategy = new Strategy(
	{ usernameField: "email" },
	async (email, password, done) => {
		try {
			if (!email || !password)
				throw new Error('Credentials Missing');

			const userDB = await User.findOne({ email });
			if (!userDB) throw new Error("User Not Found");

			const isValidCred = comparePassword(password, userDB.password);
			if (!isValidCred) throw new Error("Invalid Credentials");

			done(null, userDB._id);
		} catch (error) {
			// res.sendStatus(401).send(error.message);
			done(null, false, { message: error.message });
		}
	});

passport.use(localStrategy);
