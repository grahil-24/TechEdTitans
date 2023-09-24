const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        maxlength: [100, 'Max user name should be of 50 chars'],
        minlength: [2, 'Min user name should be of 5 chars'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'invalid email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'A user must enter the password'],
        trim: true,
        maxlength: [100, 'Password cant be of more than 100 chars'],
        minlength: [3, 'A password must have a min length of 3 chars'],
        select: false,
    },

    passwordConfirm: {
        type: String,
        required: [true, 'A user must confirm the password'],
        trim: true,
        validate: {
            //only works on create and save
            validator: function (el) {
                return el === this.password;
            },
            message: 'same!',
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^[6-9]\d{9}$/,
        unique: true,
    },
});

//encrpyting password before saving it in the database
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12); //encrpytion cost of 12.
    this.passwordConfirm = undefined; //dont save passwordConfirm in database
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
