const express = require("express");
//Using express router
const router = express.Router();

//Get home controller
const homeController = require("../controllers/home_controller");

//loading action for home route
router.get("/", homeController.home);
//Loading action for other routes in the same folder routes
router.use("/users", require("./users"));
//Loading action for 'create' route
router.use('/posts',require('./post'));


console.log("Express router is loaded");

module.exports = router;
