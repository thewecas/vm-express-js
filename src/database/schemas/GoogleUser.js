const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("google_users", GoogleUserSchema);
