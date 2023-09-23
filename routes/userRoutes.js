const express = require('express');

const userRouter = express.Router();
const authController = require('.././controllers/authController');

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);
// userRouter.get('/logout', authController.logout);

module.exports = userRouter;
