//require Express NPM library
const express = require("express");
const cors = require("cors");
// initialize dotenv
require("dotenv").config();

//import middlewares
const auth = require("./middlewares/auth");

//import database
const db = require("./db/models");
const { users, posting, comments, photos, likes } = db;

//import controllers 
const BaseController = require("./controllers/baseController.js");
const UsersController = require("./controllers/usersController.js");
const PostingsController = require("./controllers/postingsController.js");

//initialize controllers
const baseController = new BaseController();
const usersController = new UsersController(users);
const postingsController = new PostingsController(posting, users, comments, likes);

//import routers
const UsersRouter = require("./routers/usersRouter.js");
const PostingsRouter = require("./routers/postingsRouter.js");

//initialize routers
const usersRouter = new UsersRouter(usersController, auth).routes();
const postingsRouter = new PostingsRouter(postingsController, auth).routes();

//assigning PORT
const PORT = process.env.PORT;

//running the app
const app = express();

//middlewares:
const corsOptions = {
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using the routers
app.use("/users", usersRouter);
app.use("/postings", postingsRouter);
// app.use("/items", itemRouter.routes());

app.get('/jwtTest', auth, (req, res) => res.json({ msg: 'From JWT auth, you are in!' }))
// Start the server
app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
