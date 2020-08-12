var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
/*
    Defining Mongoose schema for comments
    Each Comment contains:
        - text (String)
        - author (linked using author's mongoose id)

*/


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean, default: false
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
