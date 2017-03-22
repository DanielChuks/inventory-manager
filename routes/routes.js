const path = process.cwd();
const argon2i = require('argon2-ffi').argon2i;
const UserHandler = require("../control/userControl.server.js");


module.exports = function(app, passport){
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
    .post(passport.authenticate('local', 
      { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true 
      }));
  
  app.route('/:username/admin/super')
    .get(userHandler.superAdmin);
};