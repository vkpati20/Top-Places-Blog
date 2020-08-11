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
var middleware = require('../middleware');


/*
NEW - renders comment form
*/
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    Place.findById(req.params.id, (err, foundPlace)=>{
        if(err || !foundPlace){
            req.flash("error", "Place not found");
            res.redirect("back")
        }
        else{
            res.render("comments/new", {place: foundPlace})
        }
    })
});

/*
CREATE - route where comment form is submitted to 
*/
router.post("/", middleware.isLoggedIn, (req, res)=>{
    //Looking up the current place in database
    Place.findById(req.params.id, (err, place)=>{
        if(err){
            req.flash('error', 'Error occured while submitting the form');
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

                    req.flash('succss', 'Successfully created comment');

                    //redirect to place show page
                    res.redirect("/places/" + place._id);
                }
            })
        }
    })
})

/*
EDIT - route to display comment edit form
*/
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Place.findById(req.params.id, (err, foundPlace)=>{
        if(err || !foundPlace){
            req.flash("error", "No place found");
            res.redirect("back");
        }
        else{
            Comment.findById(req.params.comment_id, (err, foundComment)=>{
                if(err){
                    res.redirect("back");
                }
                else{
                    res.render("comments/edit", {place: foundPlace, comment: foundComment})
                }
            });
        }
    });
});

/*
UPDATE  - route to submit comment edit form
*/
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
            req.flash("error", "Error while updating comment");
            res.redirect("back");
       } else {
            res.redirect("/places/" + req.params.id );
       }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            req.flash("error", "Error while deleting comment");
            res.redirect("back");
        }
        else{
            req.flash("success", "Successfully deleted comment");
            res.redirect("/places/"+req.params.id);
        }
    })
})


module.exports = router;
