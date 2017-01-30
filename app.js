// dependencies
var express = require('express');
//var routes = require('./routes');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var oauth = require('./oauth'); // this is for local test, oauth.js is .gitignored(we can't expose those vars) you need yours in local

// global config
var app = express();
var PORT = process.env.PORT || 3000;
var MONGO_DB = process.env.MONGO_DB /*|| oauth.MONGO_DB*/;
var BEST_KEPT_SECRET = process.env.BEST_KEPT_SECRET /*|| oauth.BEST_KEPT_SECRET*/;

app.use('/assets', express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: BEST_KEPT_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB);

// mongo model
// var Model_Name = require('add_your_models_here');

require('./routes/routes')(app);

// run server
app.listen(PORT, function(){
    console.log("Server running on port", PORT);
});
