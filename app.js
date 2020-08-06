const express = require("express");


//To use files ending .ejs without specifying .ejs within routes
app = express();
app.set("view engine", "ejs");

//For stylesheets
app.use(express.static(__dirname+"/public"))

app.get("/", (req, res)=>{
    res.render("landing");
});

app.listen(3000, ()=>{
    console.log("Server is started!!")
})
