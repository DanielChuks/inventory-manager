'use strict';
var path = process.cwd();
var Users = require(path + '/model/users.js');


function UserHandler() {
  this.signup = function (req, res){
    const query = req.query;
    const data = {
      username : query.username,
      password : query.password,
      firstname : query.firstname,
      lastname : query.lastname,
      accounttype : query.accounttype,
      department : query.department,
      staffcode : query.staffcode
    }
    
    Users.findOne({username : data.username}).exec(function(err, result) {
      if (err){throw err}
      else{
        if(!result){
          console.log('Good to go')
          const newUser = new Users(data);
          newUser.save(function(err){
            if(err){throw err}
            else{
              res.send(data.accounttype + data.department);
            }
          })
          
        }
        else{
          console.log('something is wrong')
          res.send("User Already Exists")
        }
      }
    })
    
    
  }
}


module.exports = UserHandler;