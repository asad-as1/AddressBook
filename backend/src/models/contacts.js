const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config();

const Schema = mongoose.Schema;

// Define the Contact schema
const contactSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
});


const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;