const BaseController = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsersController extends BaseController {
	constructor(model) {
		super(model);
	}
	// Create new user/populate new user's details:
	insertOne = async (req, res) => {
		try {
			const {
				nickname,
				email,
				password,
				avatar,
				dob,
				gender,

			} = req.body;
			console.log(req.body);

			//the following will hash user's password when user 
			//first signs up for access
			const hashedPassword = await bcrypt.hash(password, 10)

			const newUser = await this.model.create({
				nickname: nickname,
				email: email,
				password: hashedPassword,
				avatar: avatar,
				dob: dob,
				gender: gender,

			});
			console.log(newUser);
			return res.json(newUser);
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	// Retrieve user details
	getOne = async (req, res) => {
		const { userID } = req.params;
		try {
			const user = await this.model.findByPk(userID);
			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Edit user details using update()
	editOne = async (req, res) => {
		try {
			const { userID } = req.params;
			console.log(req.params)

			const findUserInfo = await this.model.findOne({
				where: { id: userID },
			});
			console.log("hello", findUserInfo)
			if (findUserInfo === null) {
				console.log("Not found!");
				return res.json({ error: "user info is not found" });
			}

			const {
				nickname,
				email,
				password,
				avatar,
				dob,
				gender,
			} = req.body;

			const updatedInfo = await this.model.update({
				nickname: nickname,
				email: email,
				password: password,
				avatar: avatar,
				dob: dob,
				gender: gender
			}, {
				where: {
					id: userID
				},
				returning: true
			}

			)
			return res.json({ msg: "hello", updatedInfo })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Delete user
	deleteOne = async (req, res) => {
		try {
			const { userID } = req.params;
			console.log(req.params)
			const deleteUser = await this.model.destroy({
				where: {
					id: userID
				}
			});
			console.log(deleteUser)
			res.json({ success: true, msg: "user deleted" })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	loginUser = async (req, res) => {
		try {
			const { email, password } = req.body;
			const findUserInfo = await this.model.findOne({
				where: { email: email },
			});
			console.log(findUserInfo)
			if (findUserInfo == null) {
				return res.status(404).json({ msg: "User not found!" })
			}
			//compare password
			let comparePassword = await bcrypt.compare(password, findUserInfo.password);
			if (!comparePassword) {
				return res.json({ msg: "Password does not match" })
			}
			console.log("testing")
			//JWT authentication
			const payload = {
				userID: findUserInfo.id
			}
			console.log(process.env.SECRET)
			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "15d"
			})

			console.log("testing123")
			res.json({ msg: "Your account is valid!", token })
		} catch (err) {
			res.json({ msg: err })
		}
	}

}
module.exports = UsersController;