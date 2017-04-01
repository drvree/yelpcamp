var Campground = require('../models/campground');
var Comment = require('../models/comment');
//all middleware goes here
var middlewareObj = {};

//check campground ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
   //is user logged in
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else{
      //does user own campground
          if(foundCampground.author.id.equals(req.user._id) ){
            next();
          } else{
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
          }
      }
    });
  } else{
    req.flash("error", "Please login first!");
    res.redirect("back");
  }
};


//check comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
   //is user logged in
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        req.flash("error", "Comment not found");
        res.redirect("back");
      } else{
      //does user own comment
          if(foundComment.author.id.equals(req.user._id) ){
            next();
          } else{
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
          }
      }
    });
  } else{
    req.flash("error", "Please login first!");
    res.redirect("back");
  }
};


//is user logged in
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please login first!");
  res.redirect("/login");
};


module.exports = middlewareObj;
