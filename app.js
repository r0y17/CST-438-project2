const express = require("express");
// const mysql   = require("mysql"); Do not need
const session = require("express-session");
var express = require('express');
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require('body-parser');
var localStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");

const app = express();


var User = require('./models/user');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var dataRoutes = require('./routers/userItemRoutes');

app.use(express.static(__dirname + '/views'));

app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
app.use(express.urlencoded());
app.use(session({ secret: 'any word', cookie:{ maxAge: 600000}}));
const port = 6969; 

app.get("/lightsabers",function(req,res){
    res.render("lightsabers.ejs");
});

app.get("/reports", async function(req, res) {
     let info = await Reports();
     res.render("reports", {"info" : info});
});

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


/*
==== Sams App.js BackEnd
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

app.use(express.static(__dirname + '/views'));


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



*/





app.get("/cart", async function(req, res){
   
});


app.post("/cart", async function(req, res){
    
    
});

app.get("/cartCheckout", function(req, res){
   
});


//needed
app.get("/", function(req, res){
   res.render("index.ejs");
});

app.get("/items",async function(req, res) {
        if (req.session.authenticated) { //if user hasn't authenticated, sending them to login screen
      //this is where the data will be retrieved from the database where you can add or delete items
      //grab all items from mysql
      
    }else { 
    
       res.render("login"); 
   
   }
});

app.get("/addItem", function(req, res){
    
    if(req.session.authenticated){//if user hasn't authenticated, sending them to the login page
    
        res.render("newItem");
        
    }else{
        
        res.redirect("/login");
        
    }
    
});//addAuthor
app.post("/addItem", async function(req, res){
    
    if(req.session.authenticated){//if user hasn't authenticated, sending them to the login page
    
        //console.log(req.body);
        let rows = await insertItem(req.body);
        //console.log(rows);
        let message = "Item WAS NOT added to the database!";
        if(rows.affectedRows > 0){
            message = "Item successfully added!"
        }
        res.render("newItem", {"message": message});;
        
    }else{
        
        res.redirect("/login");
        
    }
    
});//root

app.get("/login", function(req, res) {
    res.render("login");
    
});

app.get("/createAccount", function(req, res) {
    res.render("createAccount");
    
});


app.get("/updateItem", async function(req, res){
    
    let uniqueId = req.query.uniqueId;
    
    
    
    let itemInfo = await getItem(uniqueId);
    
    res.render("updateItem", {"itemInfo" : itemInfo});

});//admin

app.post("/updateItem", async function(req, res){
    
    let rows = await updateItem(req.body);
    
    console.log(req.body);
    
    let uniqueId = req.query.uniqueId;
    
   
    
    let itemInfo = await getItem(uniqueId);
    
    console.log(itemInfo);
    
    let message = "Item WAS NOT updated!";
    if(rows.affectedRows > 0){
        message = "Item successfully updated!";
    }
    
    res.render("updateItem", {"message" : message, "itemInfo" : itemInfo});

});//admin


app.post("/loginProcess", async function(req,res){
    //console.log(req.body.username);
    
    let result = await getPassword(req.body.username);
    
    let password = "";
    if(result.length > 0){
        password = result[0].password;
    }
    if(req.body.password == password){
        req.session.authenticated = true;
        res.send({"loginSuccess":true});
        //console.log("success");
    }else{
        res.send(false);
        //console.log("fail");
    }
});


app.get("/admin", async function(req, res){
    
    if(req.session.authenticated){//if user hasn't authenticated, sending them to the login page

    let maleProducts = await getAllProducts("Male");

    let femaleProducts = await getAllProducts("Female");

    res.render("admin", {"maleProducts":maleProducts, "femaleProducts":femaleProducts});

}else{

    res.redirect("/login");

}

 });//admin

 


 app.get("/deleteItem", async function(req,res){
    
    let rows = await deleteItem(req.query.uniqueId);
    
    console.log(rows);
    let message = "Author WAS NOT deleted!";
    if(rows.affectedRows > 0){
        message = "Author was successfully deleted!";
    }
        
   
        
    res.render("admin", {});
    
});






















function insertItem(body) {
     let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
          
        
           let params = [body.type, body.price, body.color, body.link];
        
           conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

app.get("/logout",function(req, res) {
   req.session.destroy();
   res.redirect("/");//taking the user back to the login screen
});



function updateItem(body){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Connected!");
            
           
            let params = [body.type, body.price, body.color, body.link, body.itemId];
            
            conn.query(sql, params, function(err, rows, field){
                if(err) throw err;
                conn.end();
                resolve(rows);
            });
        });
    });//Promise
}

function getPassword(username){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
          
        
           conn.query(sql, [username], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

function getItem(uniqueId){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           
        
           conn.query(sql, [uniqueId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

function deleteItem(uniqueId, gender){
     let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `DELETE FROM ${gender}Products
                      WHERE uniqueId = ?`;
        
           conn.query(sql, [uniqueId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}




// function getAllProducts(gender){
    
//     let conn = dbConnection();
    
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//           if (err) throw err;
//           console.log("Connected!");
        
//           let params = [];
        
          
        
//           console.log("SQL:", sql);
//           conn.query(sql, params, function (err, rows, fields) {
//               if (err) throw err;
//               //res.send(rows);
//               conn.end();
//               resolve(rows);
//           });
//           console.log("done");
        
//         });//connect
//     });//promise
    
// }

// function getFilteredProducts(gender, query){
    
//     let conn = dbConnection();
    
//     let type = query.type;
    
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//           if (err) throw err;
//           console.log("Connected!");
        
//           let params = []; 
        
//           let sql = `SELECT uniqueId, price, imageLink
//                      FROM ${gender}Products
//                      WHERE
//                      typeClothing LIKE '${type}'`;
//           if(query.color){
//               sql += " AND color = ?";
//               params.push(query.color);
//           }
//           if(query.price){
//               sql += " AND price <= ?";
//               params.push(query.price);
//           }
//           console.log("SQL:", sql);
//           conn.query(sql, params, function (err, rows, fields) {
//               if (err) throw err;
//               //res.send(rows);
//               conn.end();
//               resolve(rows);
//           });
//           console.log("done");
        
//         });//connect
//     });//promise
    
// }

// function getCart(gender, list){
//     let conn = dbConnection();
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//           if (err) throw err;
//           console.log("Connected!");
        
//           let sql = `SELECT uniqueId, price, color, typeClothing, imageLink
//                      FROM ${gender}Products
//                      WHERE
//                      uniqueId in (${list})`;
                     
//           console.log("SQL:", sql);
//           conn.query(sql, function (err, rows, fields) {
//               if (err) throw err;
//               //res.send(rows);
//               conn.end();
//               resolve(rows);
//           });
//           console.log("done");
        
//         });//connect
//     });//promise
// }



// function Reports(){
//     let conn = dbConnection();
    
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//           if (err) throw err;
//           console.log("Connected!");
//           let sql = `SELECT avgPriceMale, avgPriceFemale, inventory
//                     FROM Reports
//                     WHERE id = 0`;
        
//           console.log("SQL:", sql);
//           conn.query(sql, function (err, rows, fields) {
//               if (err) throw err;
//               //res.send(rows);
//               conn.end();
//               resolve(rows);
//           });
//           console.log("done");
        
//         });//connect
//     });//promise
// }










function dbConnection(){
    let conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser26",
    password: "qse9zc",
    database: "cst336_db26"
}); //createConnection
 
return conn;

}









const port = process.env.PORT || 3010; //new port server name 
app.listen(port, process.env.IP, function(){
console.log("Express server is running http://localhost:"+port );
});

// run node app.js
//or nodemon app.js