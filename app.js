const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      PassportLocal = require("passport-local");

//Requiring models for Database
const Place = require("./models/places");
      User = require("./models/users");

app = express();

//Requiring routes
const placeRoutes = require("./routes/places"),
      indexRoutes = require("./routes/index");
      methodOverride = require("method-override")



mongoose.connect('mongodb://localhost:27017/places_blog_v1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(()=>console.log("Connected to DB"))
    .catch(error=>console.log("Error connecting to DB: " + error.message));

//To use files ending .ejs without specifying .ejs within routes
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public")); //For stylesheets

//Passport config
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//this is so that we can use currentUser  variable in header.ejs to check if a user logged in or not
    //allows us to access current user to all of our templates 
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});

app.use(methodOverride("_method"));
app.use(indexRoutes);
app.use("/places", placeRoutes); //Since all placeRoutes start with /places, I'm sending the '/places' prefix to all the places routes

app.get("/", (req, res)=>{
    res.render("landing");
});

app.listen(3000, ()=>{
    console.log("Server is started!!")
})
