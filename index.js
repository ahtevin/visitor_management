var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Kousalya:ranju@kousi7@cluster0-qzlb7.mongodb.net/test?retryWrites=true",{useNewUrlParser:true});

var user = new mongoose.Schema({
    name : String,
    email : String
})


var User = mongoose.model("User",user);
app.post("/add", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });
app.use("/",function(req,res){
    res.sendFile('home.html', {root : __dirname + '/views'});
})

app.listen(8000,function(){
    console.log("server started");
})