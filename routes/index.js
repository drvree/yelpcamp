var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get("/", function(req, res){
  res.render("landing");
});

//=================
//SIGNIN ROUTE
//=================

//show sign up form
router.get("/signup", function(req, res){
  res.render("signup", {page: "signup"});
});

//handling user sign up
router.post("/signup", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("signup");
    }
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect("/campgrounds");
      });
  });
});

//================
//LOGIN ROUTES
//================

//show login form
router.get("/login", function(req, res){
  res.render("login", {page: "login"});
});

//handling log in with middleware
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
  }), function(req, res){
});

//================
//LOGOUT ROUTES
//================
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged out successfuly");
  res.redirect("/");
});


//===================
//404:PAGE NOT FOUND
//===================
// router.get("*", function(req, res){
//   res.render("error");
// });


module.exports = router;
