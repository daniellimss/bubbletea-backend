const express = require('express');
const router = express.Router();


class PostingsRouter {
	constructor(controller, auth) {
		this.controller = controller;
		this.auth = auth;
	}

	routes = () => {

		/* router.get('/', this.controller.test1); */
		router.get('/all', this.controller.getAll);

		router.get('/', this.auth, this.controller.getPostings);
		router.get('/:userID/posting', this.controller.getOne);
		router.post('/posting', this.auth, this.controller.insertOne);
		router.delete('/:postingId/posting', this.controller.deleteOnePosting);

		router.post('/:userID/posting/comments', this.controller.insertOneComment);
		router.get('/:commentsId/posting/comments', this.controller.getComment);
		router.delete('/:commentsId/posting/comments', this.controller.deleteOneComment);

		router.get('/:userId/posting/likes/:postingId', this.controller.getLike);
		router.post('/:userId/posting/likes', this.controller.addLike);
		router.delete('/:userId/posting/likes/:postingId', this.controller.removeLike);




		/* router.get('/all', this.auth, this.controller.getPostings); */
		/*router.get('/:userID', this.controller.getOne);
		router.put('/:userID', this.controller.editOne);
		router.delete('/:userID', this.controller.deleteOne);
		router.post('/login', this.controller.loginUser); */
		/* router.get('/helloWorld', this.controller.helloWorld)
		router.post('/body', this.controller.bodyTest)
		router.get('/all', this.controller.getAllUsers) */
		//router.post('/getOne', this.controller.getUser)
		/* router.post('/newUser', this.controller.insertUser)
		router.get('/userItems/:id', this.controller.getUsersItems) */


		return router;
	}
}

module.exports = PostingsRouter