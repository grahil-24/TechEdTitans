const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { appendFile } = require('fs');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    console.log(token);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: true, // for now false. keeping this true, means cookie will be sent only under secure conditions
        httpOnly: true, //cookie cannot be accessed or modified by browser
    };
    res.cookie('jwt', token);

    user.password = undefined; //hide password when sending user in response body

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    var newUser;
    const email = req.body.email;
    const user = await User.findOne({ email }); /*eslint-disable-line*/

    if (user) {
        return next(new AppError('User already exists with that email', 409));
    } else {
        newUser = await User.create(req.body);
    }

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email or password', 400));
    }

    //to check if email and password match
    const user = await User.findOne({ email }).select('+password'); //select was false in user model, so we have to manually fetch it to compare it

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    //if everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: 'success',
    });
};

//only for rendered pages. To check if user was already logged in or not.
exports.isLoggedIn = async (req, res, next) => {
    //getting token and checking if they exist. Token are sent in request headers
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
            //checking if user is still in database or not
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};
