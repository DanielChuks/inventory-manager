//const path = process.cwd();
const crypto = require('crypto');
//const bodyParser = require('body-parser');
const argon2i = require('argon2-ffi').argon2i;
const path = process.cwd();
const UserHandler = require("../control/userControl.server.js");


const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 160;

module.exports = function(app){
  const userHandler = new UserHandler();
  app.route("/")
    .get(function(req, res){
      console.log("Ok")
      res.sendFile(path + "/public/index.html");
    });
    
  app.route("/signup")
    .get(function(req, res){
      res.sendFile(path + "/public/signup.html");
    })
    .post(userHandler.signup);
    
  app.route("/login")
    .get(function(req, res){
      res.sendFile(path + "/public/login.html");
    })
    .post(userHandler.login);
    
  
  
};