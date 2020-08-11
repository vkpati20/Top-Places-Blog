var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');

/*
Routes:
    Get:    /               :Takes you to landing page  
    Get:    /register       :Takes you to register route
    Post:   /register       :Posts to register route
    Get:    /login          :Takes you to login route
    Post    /login          :Posts to login route
    Get:    /logout         :Takes you to logout route

*/

//Landing page
router.get("/", (req, res)=>{
    res.render("landing");
});

/*
    Auth Routes
*/
//Shows register form
router.get("/register", (req, res)=>{
    res.render("register");
})

//Handles sign up logic
router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err)
        {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welcome to the Blog " + user.username);
            res.redirect("/places")
        })
    })
})

//Show login form
router.get("/login", (req, res)=>{
    res.render("login");
});
router.post("/login",passport.authenticate("local", {
    successRedirect: "/places",
    failureRedirect: '/login'
}),(req, res)=>{
    //call back not needed
})


//logout route
router.get("/logout", (req, res)=>{
    req.logout();
    req.flash('success', "Logged you out");
    res.redirect("/places");
})

module.exports = router;
