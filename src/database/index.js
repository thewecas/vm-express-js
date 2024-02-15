const mongoose = require("mongoose");
require("dotenv").config();

mongoose
	.connect(process.env.MDBC_URL)
	.then(() => console.log("DB Connected..!"))
	.catch(() => console.log("DB Connection failed..!"));


