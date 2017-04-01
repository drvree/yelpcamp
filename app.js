var express                   = require('express'),
    app                       = express(),
    bodyParser                = require('body-parser'),
    mongoose                  = require('mongoose'),
    passport                  = require('passport'),
    localStrategy             = require('passport-local'),
    passportLocalMongoose     = require('passport-local-mongoose'),
    methodOverride            = require('method-override'),
    flash                     = require('connect-flash'),
    Campground                = require('./models/campground'),
    Comment                   = require("./models/comment"),
    User                      = require("./models/user"),
    seedDB                    = require('./seeds');

//Requiring Routes
var indexRoutes               = require('./routes/index'),
    campgroundRoutes          = require('./routes/campgrounds'),
    commentRoutes             = require('./routes/comments');

//connecting to db
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport configuration
app.use(require('express-session')({
  secret: "Keep on learning, CODE!!!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.moment = require('moment');
  next();
});

// seedDB(); //seed the DB

app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
  console.log("The YelpCamp server is listening.");
});











// Campground.create({
//   name: "Tibiti",
//   image: "https://s-media-cache-ak0.pinimg.com/736x/4c/dc/41/4cdc4194e782c519fdf27cee42a15b82.jpg",
//   description: "21 Arpil 2017 -  See you there!!!"
//   },
//   function(err, campground){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("NEWLY CREATED CAMPGROUND");
//     console.log(campground);
//   }
// })

  // var campgrounds = [
  //   {name: "Saramacca", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1.jpg"},
  //   {name: "Tibiti", image: "https://s-media-cache-ak0.pinimg.com/736x/4c/dc/41/4cdc4194e782c519fdf27cee42a15b82.jpg"},
  //   {name: "Toevlucht", image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg"},
  //   {name: "Saramacca", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1.jpg"},
  //   {name: "Tibiti", image: "https://s-media-cache-ak0.pinimg.com/736x/4c/dc/41/4cdc4194e782c519fdf27cee42a15b82.jpg"},
  //   {name: "Toevlucht", image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg"},
  //   {name: "Saramacca", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1.jpg"},
  //   {name: "Tibiti", image: "https://s-media-cache-ak0.pinimg.com/736x/4c/dc/41/4cdc4194e782c519fdf27cee42a15b82.jpg"},
  //   {name: "Toevlucht", image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg"}
  // ];

