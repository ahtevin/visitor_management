var express = require("express")
var dateTime = require('node-datetime');
var ejs=require('ejs');
var app = express();
var port = 4000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Kousalya:ranju@kousi7@cluster0-qzlb7.mongodb.net/test?retryWrites=true",{useNewUrlParser:true});
var nameSchema = new mongoose.Schema({
    name: String,
    email:String,
    age: String,
    gender:String,
    number:String,
    purpose:String,
    meet:String,
    from:String,
    intime:String
    


});
var User = mongoose.model("User", nameSchema);
var nameSchema1 = new mongoose.Schema({
    name:String,
    email:String,
    purpose:String,
    meet:String,
    from:String,
    intime:String

});
var user1 = mongoose.model("user1",nameSchema1);
var nameSchema2 = new mongoose.Schema({
    feedback:String,
    comment:String,
    outtime:String
});
var user2 = mongoose.model("user2",nameSchema2);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/second.html",function(req,res){
    res.sendFile(__dirname + "/second.html");

})
app.get("/third.html",function(req,res){
    res.sendFile(__dirname + "/third.html");
})

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    date = Date.now();

    myData.save()
        .then(item => {
            res.sendFile(__dirname + "/welcome.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.post("/feed", (req, res) => {
    var myData2 = new user2(req.body);
   

    myData2.save()
        .then(item => {
            res.sendFile(__dirname + "/welcome.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.post("/addfile",function(req,res){
    var myData1 = new user1(req.body);
    myData1.save()
    .then(item =>{
        res.sendFile(__dirname + "/welcome.html");
    })
    .catch(err =>{
        res.status(400).send("unable to save database");
    })
});

app.use(express.static('public'));
app.get("/feedback",function(req,res){
    res.sendFile(__dirname + "/feed.html")
})
app.get('/admin',function(req,res){
    User.find({},function(err,users){
    if(err){
    console.log("Can not find cats");
    }
    else{
    res.render("home.ejs",{users:users});
    }
    }).sort({points:-1})
    })



app.listen(port, () => {
    console.log("Server listening on port " + port);
});



//  var express = require("express");
//  var app = express();
//  var port = 5000;
//  var bodyParser = require('body-parser');
//  app.use(bodyParser.json());
//  app.use(bodyParser.urlencoded({ extended: true }));

//  var mongoose = require("mongoose");
//  mongoose.Promise = global.Promise;
//  mongoose.connect("mongodb+srv://Kousalya:ranju@kousi7@cluster0-qzlb7.mongodb.net/test?retryWrites=true",{useNewUrlParser:true});
//  var nameSchema = new mongoose.Schema({
//      age: String,
//      gender: String,
//     number: String,
//     purpose:String,
//      meet:String,
//      from :String

//  });
//  var User = mongoose.model("User", nameSchema);
//  var name1Schema = new mongoose.Schema({
   
//      purpose:String,
//      meet:String,
//      from :String
//  });
//  var User1 = mongoose.model("User1",name1Schema);


//  app.get("/", (req, res) => {
//      res.sendFile(__dirname + "/index.html");
//  });

//  app.post("/addname", (req, res) => {
//      var myData = new User1(req.body);
//      myData.save()
//          .then(item => {
//              res.send("Name saved to database");
//          })
//          .catch(err => {
//              res.status(400).send("Unable to save to database");
//          });
//  });
//  app.post("/addname1", (req, res) => {
//      var myData1 = new User(req.body);
//      myData1.save()
//          .then(item => {
//              res.send("Name saved to database");
//          })
//          .catch(err => {
//              res.send("Unable to save to database");
//          });
//  });


//  app.listen(port, () => {
//      console.log("Server listening on port " + port);
//  });
