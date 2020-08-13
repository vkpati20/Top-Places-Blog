// Auth Verification Logic

var Place = require("../models/places");
var Comment = require("../models/comments");
var middlewareObj = {};
/*
    This middleware is used to check if the user is logged and is the owener of the place.
    If the user is an admin, it gives them access to editing, updating, and deleting places
-*/
middlewareObj.checkPlaceOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Place.findById(req.params.id, (err, foundPlace)=>{
            if(err || !foundPlace){
                req.flash("error", "Place not found");
                res.redirect("back");
            }
            else{
                //if the user is logged in and there exists a place with the url, then go to next
                if(foundPlace.user.id.equals(req.user._id)  || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back")
                }
            }
        })
    }
    else{ //if the user is not logged in
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

/*
    This middleware is used to check if the user is logged and is the owener of the comment
    If the user is an admin, it gives them access to editing, updating, and deleting comments
*/
middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else{
                //does user own the campground?
                if(foundComment.user.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in");
        res.redirect("back")
    }
}

/*
    Checks if the user is logged in before performing a task.
*/
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("error", "You need to be logged in"); 
        res.redirect("/login");
    }
}

module.exports = middlewareObj;
