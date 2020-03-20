var express = require('express');
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require('body-parser');
var localStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");

var User = require('./models/user');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var dataRoutes = require('./routers/userItemRoutes');


app.use(require('express-session')({
    secret: "application secret shhhh",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const port = 1409;

///Routes for login
app.get("/api/items",dataRoutes);

app.get("/signup",(req,res)=> {
    res.render("signup");
});
app.post("/signup",(req,res)=> {
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}),req.body.password,(err,user) =>{
        if(err) {
            console.log("error");
            return res.render("register");
        }
        passport.authenticate("local")(req,res,() => {
            res.redirect('/secret');
        });

    });
});
//LogINFrom
app.get("/login",(req,res) => {
    res.render("login")
});
app.post('/login',passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),(req,res)=> {

});
app.get("/logout",(req,res)=> {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();

    }
    res.redirect("/login");
}

app.get('/',function(req,res) {
    res.sendFile('index.html');
});

app.get('/secret',isLoggedIn,function(req,res) {
    // res.render('secret'); 
});

app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})


