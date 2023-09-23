const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/signup', viewsController.getSignupForm);
module.exports = router;
