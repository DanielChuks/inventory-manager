//const path = process.cwd();
const crypto = require('crypto');
//const bodyParser = require('body-parser');
const argon2i = require('argon2-ffi').argon2i;
const users = require("../model/users.js");
const path = process.cwd();


const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 160;






module.exports = function(app){
  app.route("/")
    .get(function(req, res){
      console.log("Ok")
      res.sendFile(path + "/view/index.html");
    });
  

};