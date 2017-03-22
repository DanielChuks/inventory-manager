'use strict';
const path = process.cwd();
const User = require(path + '/model/users.js');


function UserHandler() {
  
  this.superAdmin = function(req, res){
    res.sendFile(path + "/public/superadmin.html");
  };
  
  this.admin = function(req, res){
    res.sendFile(path + "/public/admin.html");
  };
  
  this.user = function(req, res){
    res.sendFile(path + "/public/user.html");
  };
}


module.exports = UserHandler;