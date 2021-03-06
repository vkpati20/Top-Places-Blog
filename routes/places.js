/*
Routes:
Disclaimer: all routes here have a prefix: /places. Look at app.js for more details
    Get:    /           :Takes you to all places route
    Post:   /           :Post to add new place
    Get:    /new        :Takes you to create new place form
    Get:    /:id        :Takes you to specific place route to show more information about that place
    Get:    /:id/edit   :Takes you to edit place form
    Put:    /:id        :Updates the place with new information
    Delete: /:id        :Deletes a place   

*/

const express       = require('express'),
      Place         = require('../models/places'),
      router        = express.Router(),
      Comment       = require('../models/comments'),
      middleware    = require('../middleware');


/*
INDEX - show all places
*/
router.get("/", (req, res)=>{
    Place.find({}, (err, allPlaces)=>{
        if(err){
            console.log("Error occured when getting all places: " + err);
        }
        else{
            res.render("places/index", {places: allPlaces});
        }
    })
});

/*
NEW - show form to create new place
*/
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    res.render("places/new")
});

/*
CREATE - add a new place to DB
Takes a new input from form and adds to database.
*/
router.post("/", middleware.isLoggedIn, (req, res)=>{
    //get data from form in new.ejs and add to places database
    //redirect to places page
    var place = {
        user: {
            id: req.user._id,
            username: req.user.username
        },
        location: req.body.location,
        displayImage: req.body.displayImage,
        description: req.body.description
    }
    Place.create(place, (err, newPlace)=>{
        if(err){
            req.flash('error', 'Error occured while submitting the form');
            res.redirect("/places");
        }
        else{
            req.flash('success', 'Successfully created a new place');

            res.redirect("/places");
        }
    })
});


/*
SHOW - shows more info about a specific place
Displays information about each place
*/
router.get("/:id", (req, res)=>{
    //find the place with provided mongo id (that was generated automatically) and render the information of that place
    Place.findById(req.params.id).populate("comments").exec((err, foundPlace)=>{
        if(err || !foundPlace){
            req.flash('error', 'Place not found');
            res.redirect("back");
        }
        else{
            res.render("places/show", {place: foundPlace});
        }
    })

})

/*
EDIT - edit existing place
Takes you to edit form
*/
router.get("/:id/edit", middleware.checkPlaceOwnership, (req, res)=>{
    Place.findById(req.params.id, (err, foundPlace)=>{
        res.render("places/edit", {place: foundPlace});
    })
})

/*
UPDATE - where the edit form submits to
*/
router.put("/:id", middleware.checkPlaceOwnership, (req, res)=>{
    //Find and update blog and redirect back to updated blog
    Place.findByIdAndUpdate(req.params.id, req.body.place, (err, updatedPlace)=>{
        if(err){
            req.flash('error', 'Error occured while submitting the form');
            res.redirect("back");
        }
        else{
            req.flash('success', 'Successfully updated the place');
            res.redirect("/places/" + req.params.id);        
        }
    })
})


/*
DELETE - Deletes the Place and all the comments associated with it
*/
router.delete("/:id", middleware.checkPlaceOwnership, (req, res)=>{
    Place.findByIdAndRemove(req.params.id, (err, removedPlace)=>{
        if(err){
            req.flash('error', 'Error occured while deleting the place');
            res.redirect("back");
        }
        else{
            req.flash('success', 'Successfully deleted the place');
            //delete comments associated with it.
            Comment.deleteMany({_id:{ $in: removedPlace.comments }}, (err) =>{
                if(err){
                    console.log("Error deleing associated comments");
                }
            })
            res.redirect("/places")
        }
    })
})


module.exports = router;
