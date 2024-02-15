const User = require("../database/schemas/User");
const { Strategy } = require("passport-local");
const { comparePassword } = require("../utils/helper");

const strategyOptions = { usernameField: "email" };

const verifyFn = async (email, password, done) => {
	try {
		if (!email || !password) throw new Error("Credentials Missing");

		const userDB = await User.findOne({ email });
		if (!userDB) throw new Error("User Not Found");

		const isValidCred = comparePassword(password, userDB.password);
		if (!isValidCred) throw new Error("Invalid Credentials");

		done(null, userDB._id);
	} catch (error) {
		done(error, null);
	}
};

const localStrategy = new Strategy(strategyOptions, verifyFn);

module.exports = localStrategy;
