//load my env file
    require('dotenv').load();
const express = require("express");
const routes = require("./routes/routes.js");
const path = require('path');
const mongoose = require("mongoose");
const MONGODB_URI=process.env.MONGODB_URI;
const app = express();

mongoose.connect(MONGODB_URI);

//middleware for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/control', express.static(process.cwd() + '/control'));
app.use('/common', express.static(process.cwd() + '/common'));



routes(app);

//create server
app.listen(process.env.PORT || 8080, function(){
  console.log("Your Connection Listening at port: ", process.env.PORT);
});