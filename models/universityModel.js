const mongoose = require('mongoose');
const validator = require('validator');

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail],
    lowercase: true,
  },
});

const University = mongoose.model('universities', universitySchema);

module.exports = University;
