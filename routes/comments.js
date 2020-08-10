/*
Routes:
Disclaimer: all routes here have a prefix: /places/:id/comments. Look at app.js for more details
    Get:    /new                :Takes you to create new comment form  
    Post:   /                   :---
    Get:    /:comment_id/edit   :Takes you to edit existing comment form
    Put:    /:comment_id        :Puts the updated comment
    Delete: /:comment_id        :Deletes existing comment
*/

var express = require('express');
    //we send /places/:id/comments as an argument from app.use() in app.js to this file.
    //but we will get place is null error when we add a comment. So we write: mergeParams: true
    //This will merge the params from the places and the comments together so that we can access :id inside places
var router = express.Router({mergeParams: true});
var Place = require("../models/places")
var Comment = require("../models/comments")


/*
NEW - renders comment form
*/
router.get("/new", (req, res)=>{
    Place.findById(req.params.id, (err, place)=>{
        if(err){
            console.log(err);
            res.redirect("back")
        }
        else{
            res.render("comments/new", {place: place})
        }
    })
});

/*
CREATE - route where comment form is submitted to 
*/
router.post("/", (req, res)=>{
    //Looking up the current place in database
    Place.findById(req.params.id, (err, place)=>{
        if(err){
            console.log(err);
            res.redirect("/places");
        }
        else{
            //Create new comment
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    //add user ane id to comment
                    comment.user.id = req.user._id;
                    comment.user.username = req.user.username;
                    
                    //save comment
                    comment.save();

                    //connect new comment to place
                    place.comments.push(comment);
                    place.save();

                    //redirect to place show page
                    res.redirect("/places/" + place._id);
                }
            })
        }
    })
})


module.exports = router;
