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
    
    Users.findOne({$or: [{username: data.username},{staffcode: data.staffcode},{$and: [{accounttype: "superadmin"}, {accounttype: data.accounttype}]}]})
      .exec(function(err, result) {
        console.log(result)
        if (err)throw err
      
        if(!result){
          console.log(`New user, ${data.firstname} has been created!`);
          const newUser = new Users(data);
          newUser.save(function(err){
            if(err){throw err}
            else{
              res.status(200).send("success");
            }
          })
          
        }
        else{
          if(result.username === data.username){
            console.log('User already exists, can not re-add.')
            res.send("username");
          }else if(result.accounttype === data.accounttype && data.accounttype === "superadmin"){
            console.log("A super-admin already exists!");
            res.send("accounttype");
          }
          else{
            console.log("Your Staff Code is already registered!");
            res.send("staffcode");
          }
          
        }
        
    })
    
    
  }
  
  
  //log users in using the proper authentications
  this.login = function(req, res){
    console.log("Login")
  }
}


module.exports = UserHandler;