'use strict';
const path = process.cwd();
const LocalStrategy = require('passport-local').Strategy;
var User = require(path + '/model/users.js');

module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

   // set middleware
   passport.use('local-login', new LocalStrategy(
     function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
  ));
  
  /*passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        const query = req.query;
        const data = {
          username : query.username,
          password : query.password,
          firstname : query.firstname,
          lastname : query.lastname,
          accounttype : query.accounttype,
          department : query.department,
          staffcode : query.staffcode
        };

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        //check if user already exist with this username or staffcode
        //check if a super-admin already exists
        User.findOne({$or: [{username: data.username},{staffcode: data.staffcode},
          {$and: [{accounttype: "superadmin"}, {accounttype: data.accounttype}]}]},
          function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);
            if (user) {
                if(user.username === data.username){
                    console.log('User already exists, can not re-add.')
                    req.flash('User already exists, can not re-add.')
                  }else if(user.accounttype === data.accounttype && data.accounttype === "superadmin"){
                    console.log("A super-admin already exists!");
                    req.flash('A super-admin already exists!');
                  }
                  else{
                    console.log("Your Staff Code is already registered!");
                    req.flash('Your Staff Code is already registered!')
                  }
                return done(null, false);
            } else {

                // if requirements are met
                // create the user
                const newUser            = new User(data);
           
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));*/

   
};