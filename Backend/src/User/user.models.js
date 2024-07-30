const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: [true, "username required"] },
		email: { type: String, required: [true, "user email required"] },
		password: { type: String, required: [true, "password requried"] },
	},
	{
		timestamp: true,
	}
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
	UserModel,
};
