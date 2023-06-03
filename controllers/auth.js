const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

async function register(req, res) {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user: { name: user.name },
		token
	});
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}

	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) {
		throw new UnauthenticatedError("Wrong Password");
	}

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

module.exports = {
	register,
	login
};
