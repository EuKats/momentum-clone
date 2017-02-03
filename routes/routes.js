var passport = require('passport');
var Account = require('../models/account');

module.exports = function (app) {

  app.use(require('body-parser').urlencoded({ extended: true }));

  app.get('/', function (req, res) {
      var offline = false;
      var saveduser = req.cookies.savedaccount;
      if(req.cookies.offline==="true") {
          offline = true;
      } else {
          offline = false;
      }
      res.render('index', { offline: offline, user: req.user, saveduser: saveduser});
  });

  /*app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
  });*/
  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  app.post('/registerorlogin', function(req, res) {
    Account.find({username: req.body.username}, function(err, user){
        if(err){
            console.log(err);
        } else {
            if(user.length!==0){
                passport.authenticate('local', function(err, user) {
                    if(err) {
                        return res.redirect("/");
                    }
                    req.logIn(user, function(err){
                        res.cookie("savedaccount", req.body.username);
                        res.cookie("offline", "false");
                        return res.redirect("/");
                    });
                })(req, res, function(err, user){
                    res.cookie("savedaccount", req.body.username);
                    res.cookie("offline", "false");
                    res.redirect("/");
                });
            } else {
                var newAccount = new Account({ username : req.body.username });
                Account.register(newAccount, req.body.password, function(err, account) {
                    if (err) {
                        return console.log(err);
                    }
                    passport.authenticate('local')(req, res, function(){
                        res.cookie("offline", "false");
                        res.cookie("savedaccount", req.body.username);
                        res.redirect('/');
                    });
                });
            }
        }
    });
  });

  //these are used to update the cookies but I will do it using jquery in the future.
  
  app.post("/stayout", function(req, res){
      res.cookie("offline", "true");
      res.redirect("/");
  });

  app.post("/login", function(req, res){
    res.cookie("offline", "false");
    res.redirect("/");
  });

  //app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/'}) );



}