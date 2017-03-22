'use strict';
const path = process.cwd();
const User = require(path + '/model/users.js');


function UserHandler() {
  //log users in using the proper authentications
  this.login = function(req, res){
    const query = req.body;
    const username = query.username;
    const password = query.password;
    console.log(req.body);
    console.log(password, username)
    User.findOne({username: username})
      .exec(function(err, result){
        if(err){
          throw err;
        }else{
          console.log(result)
          if(result.accounttype === 'superadmin'){
            console.log('Super');
            res.redirect('/:username/admin/super')
            //redirect to superadmin
          }else if(result.accounttype === 'admin'){
            console.log('Admin');
            res.redirect('/:username/admin');
            //redirect to admin page
          }else{
            console.log('Ord')
            res.redirect('/:username');
            //redirect to normal user page
          }
          
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