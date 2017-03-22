'use strict';
const path = process.cwd();
const User = require(path + '/model/users.js');


function UserHandler() {
  //log users in using the proper authentications
  this.login = function(req, res){
    const username = !req.body.username ? req.user.username : req.body.username;
    console.log(username);
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
  
  
  this.addAdmin = function(req, res){
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
    if(req.params.username === req.user.username){
      res.sendFile(path + "/public/superadmin.html");
    }else{
      res.redirect(`/${req.user.username}/admin/super`);
    }
  };
  
  this.admin = function(req, res){
    if(req.params.username === req.user.username){
      res.sendFile(path + "/public/admin.html");
    }else{
      res.redirect(`/${req.user.username}/admin`);
    }
  };
  
  this.user = function(req, res){
    if(req.params.username === req.user.username){
      res.sendFile(path + "/public/user.html");
    }else{
      res.redirect(`/${req.user.username}`);
    }
  };
}


module.exports = UserHandler;