// Auth Verification Logic

var Place = require("../models/places");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkPlaceOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Place.findById(req.params.id, (err, foundPlace)=>{
            if(err || !foundPlace){
                console.log(err);
                res.redirect("back");
            }
            else{
                //if the user is logged in and there exists a place with the url, then go to next
                if(foundPlace.user.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log(err);
                    res.redirect("back")
                }
            }
        })
    }
    else{ //if the user is not logged in
        console.log(err);
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(Err || !founcComment){
                console.log(err);
                res.redirect("back");
            }
            else{
                if(foundComment.user.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log(err);
                    res.redirect("back");
                }
            }
        });
    }
    else{
        console.log(err);
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        console.log("Error, you need to be logged in");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;
