const express = require('express'),
      Place = require('../models/places');
      router = express.Router(),


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
CREATE - add a new place to DB
Takes a new input from form and adds to database.
*/
router.post("/", (req, res)=>{
    //get data from form in new.ejs and add to places database
    //redirect to places page
    var place = {
        name: req.body.name,
        location: req.body.location,
        displayImage: req.body.displayImage,
        description: req.body.description
    }
    Place.create(place, (err, newPlace)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/places");
        }
    })
})


/*
NEW - show form to create new place
*/
router.get("/new", (req, res)=>{
    res.render("places/new")
})

module.exports = router;
