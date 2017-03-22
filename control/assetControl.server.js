'use strict';
const path = process.cwd();
const Asset = require(path + '/model/assets.js');


function AssetHandler() {
  this.addAsset = function(req, res){
    const query = req.query;
    const asset = {
        name : query.name,
        description : query.description,
        serialnumber : query.serialnumber,
        serialcode : query.serialcode,
        purchasedate : query.purchasedate,
        available : true,
        assignedto: ''
      };
    
    Asset.findOne({$or:[{serialnumber : asset.serialnumber}, {serialcode : asset.serialcode}]})
      .exec(function(err, result){
        if (err) throw err;
        if(result){
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
  
  this.assingAsset = function(req, res){
    const query = req.query;
    const serial = query.serial;
    const assignee = query.assignee;
    
    Asset.findOneAndUpdate({serialnumber : serial}, { $set: [{ assingneto : assignee }, { available : false }] }, { upsert: true },
      function(err){
        if (err) throw err;
        res.send('true');
      });
  };
  
  
}


module.exports = AssetHandler;