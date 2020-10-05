const express = require("express");
const router = express.Router();

//Get user controller
const userController = require("../controllers/user_controller");

//Get action for the route user
router.get("/profile", userController.profile);
router.post("/post", userController.post);
router.get("/sign-up", userController.signup);
router.get("/sign-in", userController.signin);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.post('/sign-out', userController.signOut);


module.exports = router;