const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function register(req, res) {
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(10);
	const hasedPassword = await bcrypt.hash(password, salt);
	const tempUser = { name, email, password: hasedPassword };

	const user = await User.create({ ...tempUser });
	res.status(StatusCodes.CREATED).json({ user });
}

async function login(req, res) {
	res.send("login user");
}

module.exports = {
	register,
	login
};
