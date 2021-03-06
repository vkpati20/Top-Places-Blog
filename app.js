require("dotenv").config();
// Requiring packages
const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      PassportLocal     = require("passport-local"),
      methodOverride    = require("method-override"),
      flash             = require("connect-flash");

//Requiring models for Database
const Place             = require("./models/places");
      User              = require("./models/users");
      Comment           = require("./models/comments");

app = express();

//Requiring routes
const placeRoutes       = require("./routes/places"),
      indexRoutes       = require("./routes/index"),
      commentRoutes     = require("./routes/comments");


// Connecting to Database
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
app.use(flash());//For flash messages
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Allows access to current user and flash messages from all of files 
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//To send put, update, and delete requests
app.use(methodOverride("_method"));

//Calling routes
app.use(indexRoutes);
app.use("/places", placeRoutes); //Since all placeRoutes start with /places, I'm sending the '/places' prefix to all the places routes
app.use('/places/:id/comments', commentRoutes); //Since all comments start with /places/:id/comments(because they are attatched to a specific place), I'm sending the it as a prefix to all the comments routes

//Root route
app.get("/", (req, res)=>{
    res.render("landing");
});

app.listen(3000, ()=>{
    console.log("Server is started!!")
})
