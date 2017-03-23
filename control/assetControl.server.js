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
        assignedto: '',
        admin: req.user.username,
        reclaimDate: '',
        issue: {
          nature: '',
          reporter: '',
          date: '',
          reporterComment: '',
          adminComment: '',
          resolved: true
        }
      };
    
    Asset.findOne({$or: [{serialcode : asset.serialcode}, {serialnumber: asset.serialnumber}]},
      function(err, result){
        if (err) throw err;
        if(result){
          console.log(result);
          res.send('The Serial Number or Serial Code you have provided has already been assigned to an item!');
        }else{
          const newAsset = new Asset(asset);
          newAsset.save(function(err){
            if (err) throw err;
            res.send('Asset has been added successfully!');
          });
        }
      });
  };
  
  this.assignAsset = function(req, res){
    const query = req.query;
    const serial = query.serial;
    const assignee = query.assignee;
    const date = query.date;
    
    User.findOne({username:assignee})
      .exec(function(err, data){
        if (err) throw err
        if(!data){
          res.send(`No user: ${assignee}`);
        }
        else{
          const updates = {
            assignedto : assignee, 
            available : false,
            reclaimDate : date
          };
          Asset.findOneAndUpdate({$and: [{serialcode : serial}, {available : true}]}, { $set: updates},{new : true},
          function(err, result){
            if (err) throw err;
            if(result){
              res.send(`Assigned to ${assignee} successfully`);
            }else{
              res.send('No such item or it is unavailable at the moment!');
            }
            
          });
        }
        
    })
  };
  
  
  this.unAsignAsset = function(req, res){
    const serialcode = req.query.serialcode;
    Asset.findOneAndUpdate({serialcode : serialcode}, {$set:{assignedto : '', available : true, reclaimDate:'' }}, {new : true},
    function(err, data){
      if(err) throw err;
      if(data){
        res.send("Unassigned successfully!");
      }else{
        res.send("not item");
      }
    })
  };
  
  this.availableAssets = function(req, res){
    console.log(req.user.username);
    Asset.find({available: true, admin : req.user.username})
      .exec(function (err, result) {
        if (err) { throw err}
        if(!result){
          res.send("No results");
        }
        res.json(result);
      });
  };
  
  this.assignedAssets = function(req, res){
    Asset.find({available: false})
      .exec(function (err, result) {
        if (err) { throw err}
        if(!result){
          res.send("No results");
        }
        res.json(result);
      });
  };
  
}


module.exports = AssetHandler;