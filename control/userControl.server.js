'use strict';
const path = process.cwd();
const User = require(path + '/model/users.js');


function UserHandler() {
  this.addadmin = function(req, res){
    const username = req.query.username;
    User.findOneAndUpdate({$and: [{username : username}, {department : 'Operations and Facilities'}, {accounttype : 'ordinary'}]},
    { $set: { accounttype : 'admin'}},{new : true},
      function(err, result){
        if (err) throw err;
        if(result){
          res.send('added as admin');
        }else{
          res.send('No user, or wrong department or user is already an admin');
        }
        
      });
  };
  
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