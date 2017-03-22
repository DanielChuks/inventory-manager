//load my env file
    require('dotenv').load();
const express = require("express");
const routes = require("./routes/routes.js");
const path = require('path');
const mongoose = require("mongoose");
const MONGODB_URI=process.env.MONGODB_URI;
const app = express();
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');

require('./config/passport')(passport);

mongoose.connect(MONGODB_URI);


//middleware for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/control', express.static(process.cwd() + '/control'));
app.use('/common', express.static(process.cwd() + '/common'));

// log every request to the console
// read cookies (needed for auth)
// get information from html forms
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser()); 

var sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new MongoStore({ mongooseConnection: mongoose.connections[0] })
  }

// trust first proxy
// serve secure cookies
//14 days
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) 
    sess.cookie.secure = true; 
    sess.cookie.maxAge = 1000 * 60 * 60 * 14;
  }

app.use(session(sess));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


routes(app, passport);

//create server
app.listen(process.env.PORT || 8080, function(){
  console.log("Your Connection Listening at port: ", process.env.PORT);
});