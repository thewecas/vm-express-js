const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		authProvider: {
			type: String,
			required: true,
		},
		authId: {
			type: String,
			unique: true,
		},
		displayName: {
			type: String,
		},
		displayPicture: {
			type: String,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
