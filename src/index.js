require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const logger = require("./middlewares/logger");

require("./database");
// require("./strategies/local");
require("./strategies/discord");
require("./strategies/google");

//Routes
const authRoute = require("./router/auth");
const marketRoute = require("./router/market");
const groceriesRoute = require("./router/groceries");

const app = express();
const PORT = process.env.PORT;

const memoryStore = new session.MemoryStore();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		secret: "DH44H234HB2SZRJBJWERJ23",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: 'mongodb://localhost:27017/expressjs_tutorial'
		})
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger);

app.use("/api/v1/auth", authRoute);

app.use((req, res, next) => {
	if (req.user) next();
	else res.sendStatus(500);
});

app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/market", marketRoute);

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT} ...!`);
});
