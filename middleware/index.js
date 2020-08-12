// Auth Verification Logic

var Place = require("../models/places");
var Comment = require("../models/comments");
var middlewareObj = {};

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
