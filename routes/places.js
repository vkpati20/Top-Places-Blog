var express = require('express');
var router = express.Router();
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

router.get("/", (req, res)=>{
    res.send("You are at /places route")
});

module.exports = router;
