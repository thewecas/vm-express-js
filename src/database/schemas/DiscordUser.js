const mongoose = require("mongoose");

const DiscordUserSchema = new mongoose.Schema(
    {
        discordId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("discord_users", DiscordUserSchema);
