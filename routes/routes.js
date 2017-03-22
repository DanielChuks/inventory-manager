const path = process.cwd();
const argon2i = require('argon2-ffi').argon2i;
const UserHandler = require("../control/userControl.server.js");
const AssetHandler = require("../control/assetControl.server.js");


module.exports = function(app, passport){
  const userHandler = new UserHandler();
  const assetHander = new AssetHandler();
  app.route("/")
    .get(function(req, res){
      console.log("Ok")
      res.sendFile(path + "/public/index.html");
    });
    
  app.route("/signup")
    .get(function(req, res){
      res.sendFile(path + "/public/signup.html");
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/',
        failureFlash : true
    }));
    
  app.route("/login")
    .get(function(req, res){
      res.sendFile(path + "/public/login.html");
    })
    .post(passport.authenticate('local-login', 
      { failureRedirect: '/login',
        failureFlash: true 
      }), userHandler.login);
  
  app.route('/:username/admin/super')
    .get(userHandler.superAdmin);
    
  app.route('/:username/admin')
    .get(userHandler.admin);
    
  app.route('/:username')
    .get(userHandler.user);
    
  /*********API********/
  app.route('/api/addasset')
    .get(assetHander.addAsset)
    .post(assetHander.addAsset);
    
  app.route('/api/assignasset')
    .get(assetHander.assignAsset)
    .post(assetHander.assignAsset);
    
  app.route('/api/unassignasset')
    .get(assetHander.unAsignAsset)
    .post(assetHander.unAsignAsset);
  
  app.route('/api/addadmin')
    .get(userHandler.addAdmin)
    .post(userHandler.addAdmin);
    
  /*app.route('/api/asset')
    .get()
    .post();*/
    
    
    
};