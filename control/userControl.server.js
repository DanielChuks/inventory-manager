'use strict';
const path = process.cwd();
const Users = require(path + '/model/users.js');


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
    const query = req.query;
    const username = query.username;
    const password = query.password;
    Users.findOne({username: username, password: password})
      .exec(function(err, result){
        if(err)throw err;
        if(!result){
          console.log('Wrong user details.');
          res.send('false');
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
  
  this.superAdmin = function(req, res){
    const username = req.params.username;
    function pageLoader(obj){
      const fullPage = "";
      //const str = JSON.stringify(obj, replacer);
      
      const head = `<head><title>Andelasset</title><link rel="icon" type="image/x-icon" href="img/favicon.ico">`+
        `<link href="https://fonts.googleapis.com/css?family=Cabin+Sketch|Josefin+Slab|Khand|Marck+Script|Monoton|Poiret+One|Rajdhani|Special+Elite|VT323" rel="stylesheet">`+
        `<link href="css/main.css" rel="stylesheet" type="text/css"></head>`,
          htmlOpen = `<html>`,
          htmlClose = `</html>`,
          bodyOpen = `<body>`,
          bodyClose = `</body>`,
          header =`<header><div class="back header"><ul><li><a href="#" id="logout">Log Out</a></li>`+
            `<li><a href="#" id="profile">${obj.firstname}</a></li></ul></div></header>`+
            `<li><a href="#" id="home">AndelAsset</a></li></ul></div></header>`,
          scripts = `<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>`+
                  `<script type="text/javascript" src="/controllers/googleLoader.client.js"></script></head>`+
                  `<script type="text/javascript" src="/common/ajax-functions.js"></script>` +
                  `<script type="text/javascript" src="/controllers/pollLinkCont.client.js"></script>`+
                  `<script type="text/javascript" src="/controllers/sessionCont.client.js"></script>`;
          
                  
          
          
          fullPage = htmlOpen + head  + header + bodyOpen +  htmlClose + scripts + bodyClose + htmlClose;
          res.send(fullPage);
        }
        
    
    //use replacer function to deal with spaces in stringify
    function replacer(key, value) {
      // Filtering out properties
      if (typeof value === 'string') {
        const arr = value.split(" ");
        const str = arr.join("---");
        return str;
      }
      return value;
    }
    
    Users.findOne({username}).exec(function(err, result){
      if(err){throw err}
      if(!result){
        res.redirect('/login');
      }else{
        pageLoader(result);
      }
    });
  };
  
  
  
  
}


module.exports = UserHandler;