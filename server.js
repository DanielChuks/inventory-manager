const express = require("express");
const routes = require("./routes/routes.js");

const app = express();

app.use('/control', express.static(process.cwd() + '/control'));
app.use('/view', express.static(process.cwd() + '/view'));
app.use('/common', express.static(process.cwd() + '/common'));

routes(app);

//create server
app.listen(process.env.PORT || 8080, function(){
  console.log("Your Connection Listening at port: ", process.env.PORT);
});