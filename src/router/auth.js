const Router = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helper");

const router = Router();

// router.post("/login", async (req, res) => {

// 	// const { username, password } = req.body;
// 	// if (!username || !password) return res.sendStatus(400);
// 	// const userDB =await User.findOne({ username });
// 	// if (!userDB) return res.sendStatus(401);
// 	// const isValid = comparePassword(password, userDB.password);
// 	// if (isValid) {
// 	// 	req.session.user = userDB;
// 	// 	return res.sendStatus(200);
// 	// }
// 	// else {
// 	// 	return res.sendStatus(401)
// 	// }
// });

router.post("/login", passport.authenticate('local'), (req, res) => {
	console.log("Logged in");
	res.sendStatus(200);
});


// Dissord Auth
router.get("/discord", passport.authenticate('discord'), (req, res) => {
	console.log("Logging in using DISCORD");
	res.sendStatus(200);
});

router.get("/discord/redirect", passport.authenticate('discord'), (req, res) => {
	console.log("Logged using DISCORD");
	res.sendStatus(200);
});


// Google Auth
router.get("/google", passport.authenticate('google'), (req, res) => {
	console.log("Logged in to google");
	res.sendStatus(200);
});

router.get('/google/redirect', passport.authenticate('google'), (req, res,) => {
	console.log("Successful google oauth ");
	res.send(200);

});




router.post("/register", async (req, res) => {
	const { email, password } = req.body;

	const userDB = await User.findOne({ email });

	if (userDB) {
		res.status(400).send("User Already Exist");
	} else {
		const password = hashPassword(req.body.password);

		const newUser = await User.create({ email, password });
		const saveUser = newUser.save();

		res.send(201);
	}
});

module.exports = router;
