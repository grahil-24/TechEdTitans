const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const path = require('path');

router.get('/', authController.isLoggedIn, viewsController.getFrontPage);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/signup', viewsController.getSignupForm);
module.exports = router;
