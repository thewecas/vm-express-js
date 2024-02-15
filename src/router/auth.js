const Router = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helper");

const router = Router();

// Google Auth
router.get("/google",
	passport.authenticate("google"),
	(req, res) => {
		if (req.user) res.sendStatus(201);
	});

router.get("/google/redirect",
	passport.authenticate("google"),
	(req, res) => {
		if (req.user) res.sendStatus(201);
	});


// Dissord Auth
router.get("/discord",
	passport.authenticate("discord"),
	(req, res) => {
		if (req.user) res.sendStatus(201);
	});

router.get(
	"/discord/redirect",
	passport.authenticate("discord"),
	(req, res) => {
		if (req.user) res.sendStatus(201);
	}
);

// Local
router.post("/login",
	passport.authenticate("local"),
	(req, res) => {
		if (req.user) res.sendStatus(201);
	});



router.post("/register",
	async (req, res) => {
		const { email, username } = req.body;

		try {
			const userDB = await User.findOne({ email });

			if (userDB) throw new Error("User Already Exist");
			else {
				const password = hashPassword(req.body.password);
				const newUser = await User.create({
					email: email,
					authProvider: 'local',
					displayName: username,
					password: password
				});
				newUser.save();

				console.log("New User ", newUser);

				res.sendStatus(201);
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	});

module.exports = router;
