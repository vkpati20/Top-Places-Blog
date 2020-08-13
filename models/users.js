var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
/*
    Defining Mongoose schema for Users
    Each User contains:
        - username
        - passowrd
        - isAdmin (default: false)
        

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
