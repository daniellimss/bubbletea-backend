const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

	try {
		const token = req.headers.authorization.split(' ')[1]
		const verified = jwt.verify(token, process.env.SECRET);

		next()
		console.log(verified)
	} catch (err) {
		res.status(403).json({ msg: "invalid token" })
	}
}
module.exports = auth;