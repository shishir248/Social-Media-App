const express = require("express");
const router = express.Router();
const passport = require("passport");

//Get user controller
const userController = require("../controllers/user_controller");

//Get action for the route user
router.get("/profile", passport.checkAuthentication, userController.profile);
router.post("/post", userController.post);
router.get("/sign-up", userController.signup);
router.get("/sign-in", userController.signin);
router.get("/sign-out", userController.destroySession);

router.post("/create", userController.create);
//Use passport as a middleware
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  userController.createSession
);

module.exports = router;
