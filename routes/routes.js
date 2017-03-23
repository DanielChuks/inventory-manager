const path = process.cwd();
const UserHandler = require("../control/userControl.server.js");
const AssetHandler = require("../control/assetControl.server.js");


module.exports = function(app, passport){
  const userHandler = new UserHandler();
  const assetHander = new AssetHandler();
  app.route("/")
    .get(function(req, res){
        res.sendFile(path + "/public/index.html");
      });
    ;
    
  app.route("/signup")
    .get(notLoggedIn, function(req, res){
      res.sendFile(path + "/public/signup.html");
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/',
        failureFlash : true
    }));
    
  app.route("/login")
    .get(notLoggedIn, function(req, res){
      res.sendFile(path + "/public/login.html");
    })
    .post(passport.authenticate('local-login', 
      { failureRedirect: '/login',
        failureFlash: true 
      }), userHandler.login);
      
  app.route("/logout")
    .get(function(req, res) {
        req.logout();
        res.redirect('/');;
    })
    
  
  app.route('/:username/admin/super')
    .get(userHandler.superAdmin);
    
  app.route('/:username/admin')
    .get(userHandler.admin);
    
  app.route('/:username')
    .get(userHandler.user);
    
  /*********API********/
  app.route('/api/addasset')
    .post(assetHander.addAsset);
    
  app.route('/api/assignasset')
    .post(assetHander.assignAsset);
    
  app.route('/api/unassignasset')
    .post(assetHander.unAsignAsset);
  
  app.route('/api/addadmin')
    .post(userHandler.addAdmin);
    
  app.route('/api/availableassets')
    .get(assetHander.availableAssets);
    
  app.route('/api/assignedassets')
    .get(assetHander.assignedAssets);
    
    
  //check if user is authenticated
    function isLoggedIn (req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      } else {
          res.redirect('/login');
      }
    }
  
  //if not log in continue next action, else redirect to appropriate profile
    function notLoggedIn(req, res, next){
      if (!req.isAuthenticated()) {
          return next();
      } else {
          return userHandler.login(req, res);
      }
    }
    
    
};