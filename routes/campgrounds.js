var express = require('express');
var router  = express.Router();
var geocoder = require('geocoder');
var Campground = require('../models/campground');
var middleware = require('../middleware');


//INDEX ROUTE - display data from DB
router.get("/", function(req, res){
  //Get all campgrounds from DB
  Campground.find({},function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else{
    res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
    }
  });
});

//CREATE ROUTE - add new to DB
router.post("/",middleware.isLoggedIn, function(req, res){
  //get data from form to add to campgrounds array
  var name  = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var descr = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  geocoder.geocode(req.body.location, function(err, data){
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].geometry.formatted_address;
    var newCampground = {name:name, price:price, image:image, description: descr, author:author,  location: location, lat: lat, lng: lng};
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
      if(err){
        console.log(err);
      } else{
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
      }
    });
  });
});

//NEW ROUTE - show form to create
router.get("/new",middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//SHOW ROUTE - show information on one specific item
router.get("/:id", function(req, res){
  //find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else{
    //render show template with selected campground info
    res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
     Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground});
    });
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground){
        res.redirect("/campgrounds/" + req.params.id);
    });
  });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    req.flash("success", "Campground deleted");
    res.redirect("/campgrounds");
  });
});


module.exports = router;

