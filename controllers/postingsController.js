const BaseController = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

class PostingsController extends BaseController {
	constructor(model, users, comments, likes) {
		super(model);
		this.users = users;
		this.comments = comments;
		this.likes = likes;
	}

	//Test posting route
	test1 = async (req, res) => {
		try {
			res.json({ success: true, msg: "posting route is working!" })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Creating a getAll
	getAll = async (req, res) => {
		const { userId, rating, recent } = req.query;
		//with req.query, this means we can put any or all 3 
		//of the above const into the url with ? string,
		//example : localhost:8000/postings/all?recent=true
		try {
			const query = {}
			const order = []
			if (userId) {
				query.userId = userId
			}
			if (rating) {
				query.rating = {
					[Op.gte]: 4
				}
			}
			if (recent) {
				order.push(["createdAt", 'DESC'])
			}
			console.log(order)
			const everything = await this.model.findAll({

				where: query,

				include: [
					{
						model: this.users,
						attributes: ["nickname", "id", "email", "avatar"],
						include: this.comments
					},
				],

				/*The following will show everything */
				/* include: {
					all: true, nested: true
				} */
				order: order,
			});
			console.log("is it working?")
			return res.json({ success: true, everything })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Retrieve all postings
	getPostings = async (req, res) => {
		try {
			const listings = await this.model.findAll();
			return res.json({ success: true, msg: "postings route is ok!", listings });
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Retrieve specific posting
	getOne = async (req, res) => {
		try {
			const { userID } = req.params;
			const posting = await this.model.findByPk(userID);
			return res.json(posting);
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Create a new posting
	insertOne = async (req, res) => {
		try {
			const {
				userId,
				title,
				drinksName,
				sugarLevel,
				shopLocation,
				photoUrl,
				price,
				rating,
				content,
				postedDate
			} = req.body;
			console.log(req.body);

			const newPosting = await this.model.create({
				userId: userId,
				title: title,
				drinksName: drinksName,
				sugarLevel: sugarLevel,
				shopLocation: shopLocation,
				photoUrl: photoUrl,
				price: price,
				rating: rating,
				content: content,
				postedDate: postedDate,
			})
			console.log(newPosting);
			return res.json(newPosting);
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Add a comment to a specific posting
	insertOneComment = async (req, res) => {
		try {
			const { userId, postingId, content } = req.body;
			const newComment = await this.comments.create({
				userId: userId,
				postingId: postingId,
				content: content
			})
			console.log(newComment);
			return res.json(newComment);
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Get and view one comment to a specific posting
	getComment = async (req, res) => {
		try {
			const { commentsId } = req.params;
			const viewComment = await this.comments.findOne({
				where: {
					id: commentsId
				}
			})
			console.log(viewComment)
			return res.json({ success: true, viewComment })
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//View likes to a posting
	getLike = async (req, res) => {
		try {
			const { userId, postingId } = req.params;
			const viewLike = await this.likes.findOne({
				where: {
					userId, postingId
				}
			});
			return res.json(viewLike)
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	// Remove a like to a posting
	removeLike = async (req, res) => {
		try {
			const { userId, postingId } = req.params;

			const findLike = await this.likes.findOne({
				where: {
					userId, postingId
				}
			});
			if (findLike) {
				const removeLike = await this.likes.destroy({
					where: {
						id: findLike.id
					}
				})
			}
			return res.json({ success: true });
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	// Add a like to a posting
	addLike = async (req, res) => {
		try {
			const { userId, postingId } = req.body;
			const newLike = await this.likes.create({
				userId: userId,
				postingId: postingId,
			})
			return res.json(newLike);
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}
	// Remove a posting
	deleteOnePosting = async (req, res) => {
		try {
			const { postingId } = req.params;
			console.log(req.params)
			const deletePosting = await this.model.destroy({
				where: {
					id: postingId
				}
			});
			console.log(deletePosting)
			res.json({ success: true, msg: "posting deleted" })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	// Remove a comment
	deleteOneComment = async (req, res) => {
		try {
			const { commentsId } = req.params;
			console.log(req.params)
			const deleteComment = await this.comments.destroy({
				where: {
					id: commentsId
				}
			});
			console.log(deleteComment)
			res.json({ success: true, msg: "comment deleted" })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}


}

module.exports = PostingsController;
