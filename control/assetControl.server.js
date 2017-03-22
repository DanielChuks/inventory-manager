'use strict';
const path = process.cwd();
const Asset = require(path + '/model/assets.js');
const User = require(path + '/model/users.js');


function AssetHandler() {
  this.addAsset = function(req, res){
    const query = req.query;
    const asset = {
        name : query.name,
        description : query.description,
        serialnumber : Number(query.serialnumber),
        serialcode : query.serialcode,
        purchasedate : query.purchasedate,
        available : true,
        assignedto: ''
      };
    
    Asset.findOne({serialcode : asset.serialcode},
      function(err, result){
        if (err) throw err;
        if(result){
          console.log(result);
          res.send('false');
        }else{
          const newAsset = new Asset(asset);
          newAsset.save(function(err){
            if (err) throw err;
            res.send('true');
          });
        }
      });
  };
  
  this.assignAsset = function(req, res){
    const query = req.query;
    const serial = query.serial;
    const assignee = query.assignee;
    
    User.findOne({username:assignee})
      .exec(function(err, data){
        if (err) throw err
        if(!data){
          res.send("no user");
        }
        else{
          Asset.findOneAndUpdate({$and: [{serialnumber : serial}, {available : true}]}, { $set: { assignedto : assignee, available : false }},{new : true},
          function(err, result){
            if (err) throw err;
            if(result){
              res.send('assigned');
            }else{
              res.send('no item or unavailable');
            }
            
          });
        }
        
    })
  };
  
  
  this.unAsignAsset = function(req, res){
    const serialcode = req.query.serialcode;
    Asset.findOneAndUpdate({serialcode : serialcode}, {$set:{assignedto : '', available : true }}, {new : true},
    function(err, data){
      if(err) throw err;
      if(data){
        res.send("unassigned");
      }else{
        res.send("not item");
      }
    })
  }
  
}


module.exports = AssetHandler;