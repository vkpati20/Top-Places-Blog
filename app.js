const express = require("express");


//To use files ending .ejs without specifying .ejs within routes
app = express();
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(3000, ()=>{
    console.log("Server is started!!")
})
