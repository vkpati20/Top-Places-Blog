const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose")

//Requiring models for Database
const Place = require("./models/places");


app = express();

//Requiring routes
const placeRoutes = require("./routes/places"),
      indexRoutes = require("./routes/index");

//To use files ending .ejs without specifying .ejs within routes
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public")); //For stylesheets

mongoose.connect('mongodb://localhost:27017/places_blog_v1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(()=>console.log("Connected to DB"))
    .catch(error=>console.log("Error connecting to DB: " + error.message));




// Place.create(
//     {
//         name: "Veeru",
//         location: "Plano",
//         displayImage: "https://image.png",
//         description: "This is description"
//     },
//     (err, place)=>{
//         if(err)
//             console.log("Error creating place: " + err);
//         else{
//             console.log("Created a new place");
//             console.log(place);
//         }

//     }
// )

app.use(indexRoutes);
app.use("/places", placeRoutes); //Since all placeRoutes start with /places, I'm sending the '/places' prefix to all the places routes

app.get("/", (req, res)=>{
    res.render("landing");
});

app.listen(3000, ()=>{
    console.log("Server is started!!")
})
