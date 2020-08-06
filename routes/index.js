var express = require('express');
var router = express.Router();

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

module.exports = router;
