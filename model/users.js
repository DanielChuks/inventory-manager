'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  username : String,
  password : String,
  firstname : String,
  lastname : String,
  usertype : String,
  department : String,
  staffcode : String
});

module.exports = mongoose.model('Users', Users);