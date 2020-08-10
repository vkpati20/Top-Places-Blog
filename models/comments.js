  
var mongoose = require("mongoose");
 
/*
    Defining Mongoose schema for comments
    Each Comment contains:
        - text (String)
        - author (linked using author's mongoose id)

*/

var commentSchema = new mongoose.Schema({
    text: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
 
module.exports = mongoose.model("Comment", commentSchema);