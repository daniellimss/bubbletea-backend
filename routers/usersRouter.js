const express = require('express');
const router = express.Router();


class UsersRouter {
	constructor(controller, auth) {
		this.controller = controller;
		this.auth = auth;
	}

	//Reminder : Add 'this.auth' before 'this.controller' for 
	//all routes except newUser (new signup)
	//when project is fully developed and ready for production
	routes = () => {
		router.get('/jwtTest', this.controller.test);
		router.post('/newUser', this.controller.insertOne);
		router.get('/:userID', this.auth, this.controller.getOne);
		router.put('/:userID', this.auth, this.controller.editOne);
		router.delete('/:userID', this.controller.deleteOne);
		router.post('/login', this.controller.loginUser);
		/* router.get('/helloWorld', this.controller.helloWorld)
		router.post('/body', this.controller.bodyTest)
		router.get('/all', this.controller.getAllUsers) */
		//router.post('/getOne', this.controller.getUser)
		/* router.post('/newUser', this.controller.insertUser)
		router.get('/userItems/:id', this.controller.getUsersItems) */


		return router;
	}
}

module.exports = UsersRouter