var mongoose = require("mongoose");

/*
    Defining Mongoose schema for places
    Each Place contains:
        -name (String)
        -location (String)
        displayImage (String - url)
        description (String)
        author (linked using author's mongoose id)
        comments (linked using users' mongoose id)
*/
var placeSchema = new mongoose.Schema({
    user:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    location: String,
    displayImage: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})


module.exports = mongoose.model("Place", placeSchema);
