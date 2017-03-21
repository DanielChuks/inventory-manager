'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username : String,
  password : String,
  firstname : String,
  lastname : String,
  accounttype : String,
  department : String,
  staffcode : String
});

module.exports = mongoose.model('Users', User);