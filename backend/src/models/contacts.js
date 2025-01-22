const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
// const User = require("../models/user")
dotenv.config();

const Schema = mongoose.Schema;

// Define the Contact schema
const contactSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});


const Contact = mongoose.model('Contacts', contactSchema);
module.exports = Contact;