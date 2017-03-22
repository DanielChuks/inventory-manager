'use strict';

const mongoose = require('mongoose');
const AssetSchema = mongoose.Schema;

const assetSchema = new AssetSchema({
  name : String,
  description : String,
  serialnumber : Number,
  serialcode : String,
  purchasedate : String,
  available : Boolean,
  assignedto: String
});

// create the model for users and expose it to our app

module.exports = mongoose.model('Asset', assetSchema);

