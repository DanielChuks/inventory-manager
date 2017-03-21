const express = require("express");
const routes = require("./routes/routes.js");
const path = require('path')

const app = express();

//app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/control', express.static(process.cwd() + '/control'));
app.use('/view', express.static(process.cwd() + '/view'));
app.use('/common', express.static(process.cwd() + '/common'));*/

routes(app);

//create server
app.listen(process.env.PORT || 8080, function(){
  console.log("Your Connection Listening at port: ", process.env.PORT);
});