'use strict';
const path = process.cwd();
const Users = require(path + '/model/users.js');


function UserHandler() {
  //log users in using the proper authentications
  this.login = function(req, res){
    const query = req.query;
    const username = query.username;
    const password = query.password;
    Users.findOne({username: username, password: password})
      .exec(function(err, result){
        if(err){
          throw err;
        }else{
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
}


module.exports = UserHandler;