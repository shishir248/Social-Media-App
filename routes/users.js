const express = require("express");
const router = express.Router();

//Get user controller
const userController = require("../controllers/user_controller");

//Get action for the route user
router.get("/profile", userController.profile);
router.post("/post", userController.post);

module.exports = router;
