var mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment');

var data = [
    {
    name:"Camp 1",
    image: "https://www.recreation.gov/webphotos/NRSO/pid73840/0/540x360.jpg",
    description: "In facilisis scelerisque dui vel dignissim. Sed nunc orci, ultricies congue vehicula quis, facilisis a orci. In aliquet facilisis condimentum. Donec at orci orci, a dictum justo. Sed a nunc non lectus fringilla suscipit. Vivamus pretium sapien sit amet mauris aliquet eleifend vel vitae arcu. Fusce pharetra dignissim nisl egestas pretium. Nullam eros mi, mollis in sollicitudin non, tincidunt sed enim. Sed et felis metus, rhoncus ornare nibh. Ut at magna leo. Suspendisse egestas est ac dolor imperdiet pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor, erat sit amet venenatis luctus, augue libero ultrices quam, ut congue nisi risus eu purus. Cras semper consectetur elementum. Nulla vel aliquet libero. Vestibulum eget felis nec purus commodo convallis. Aliquam erat volutpat. "
    },
    {
    name:"Camp 2",
    image: "https://www.recreation.gov/webphotos/NRSO/pid73840/0/540x360.jpg",
    description: "In facilisis scelerisque dui vel dignissim. Sed nunc orci, ultricies congue vehicula quis, facilisis a orci. In aliquet facilisis condimentum. Donec at orci orci, a dictum justo. Sed a nunc non lectus fringilla suscipit. Vivamus pretium sapien sit amet mauris aliquet eleifend vel vitae arcu. Fusce pharetra dignissim nisl egestas pretium. Nullam eros mi, mollis in sollicitudin non, tincidunt sed enim. Sed et felis metus, rhoncus ornare nibh. Ut at magna leo. Suspendisse egestas est ac dolor imperdiet pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor, erat sit amet venenatis luctus, augue libero ultrices quam, ut congue nisi risus eu purus. Cras semper consectetur elementum. Nulla vel aliquet libero. Vestibulum eget felis nec purus commodo convallis. Aliquam erat volutpat. "
    },
    {
    name:"Camp 3",
    image: "https://www.recreation.gov/webphotos/NRSO/pid73840/0/540x360.jpg",
    description: "In facilisis scelerisque dui vel dignissim. Sed nunc orci, ultricies congue vehicula quis, facilisis a orci. In aliquet facilisis condimentum. Donec at orci orci, a dictum justo. Sed a nunc non lectus fringilla suscipit. Vivamus pretium sapien sit amet mauris aliquet eleifend vel vitae arcu. Fusce pharetra dignissim nisl egestas pretium. Nullam eros mi, mollis in sollicitudin non, tincidunt sed enim. Sed et felis metus, rhoncus ornare nibh. Ut at magna leo. Suspendisse egestas est ac dolor imperdiet pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor, erat sit amet venenatis luctus, augue libero ultrices quam, ut congue nisi risus eu purus. Cras semper consectetur elementum. Nulla vel aliquet libero. Vestibulum eget felis nec purus commodo convallis. Aliquam erat volutpat. "
    },
    {
    name:"Camp 4",
    image: "https://www.recreation.gov/webphotos/NRSO/pid73840/0/540x360.jpg",
    description: "In facilisis scelerisque dui vel dignissim. Sed nunc orci, ultricies congue vehicula quis, facilisis a orci. In aliquet facilisis condimentum. Donec at orci orci, a dictum justo. Sed a nunc non lectus fringilla suscipit. Vivamus pretium sapien sit amet mauris aliquet eleifend vel vitae arcu. Fusce pharetra dignissim nisl egestas pretium. Nullam eros mi, mollis in sollicitudin non, tincidunt sed enim. Sed et felis metus, rhoncus ornare nibh. Ut at magna leo. Suspendisse egestas est ac dolor imperdiet pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor, erat sit amet venenatis luctus, augue libero ultrices quam, ut congue nisi risus eu purus. Cras semper consectetur elementum. Nulla vel aliquet libero. Vestibulum eget felis nec purus commodo convallis. Aliquam erat volutpat. "
    }
];


function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!".toUpperCase());
    });
    //add a few campgrounds
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         } else{
    //             console.log("ADDED NEW CAMPGROUND");
    //             //create comment
    //             Comment.create(
    //                 {
    //                     text: "This place is awesome!",
    //                     author: "Homer"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else{
    //                         //add a few comments
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("CREATED NEW COMMENT");
    //                     }
    //             });
    //         }
    //     });
    // });

}

module.exports = seedDB;
