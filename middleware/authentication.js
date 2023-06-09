const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new UnauthenticatedError("Authentication Invalid");
	}

	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// const user = User.findById(payload.id).select("-password");
		// req.user = user;

		const { userId, name } = payload;
		req.user = { userId, name };
		next();
	} catch (error) {
		throw new UnauthenticatedError(Object.values(error));
	}
};

module.exports = authenticationMiddleware;
