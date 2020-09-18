const express = require('express');
//Using express router
const router = express.Router();

//Get home controller
const homeController = require('../controllers/home_controller');

//loading action for home route
router.get('/', homeController.home);

console.log('Express router is loaded');

module.exports = router;