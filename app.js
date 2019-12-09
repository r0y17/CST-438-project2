const express = require("express");
const mysql   = require("mysql");
const sha256  = require("sha256");
const session = require('express-session');
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
app.use(express.urlencoded()); //use to parse data sent using the POST method
app.use(session({ secret: 'any', cookie: { maxAge: 60000 }}))

app.get("/", function(req, res){
   res.render("index.ejs");
});


app.get("/male", function(req, res){
    res.render("male.ejs");
});

// mines
app.get("/female", function(req, res){
    res.render("female.ejs");
});


app.get("/cart", function(req, res){
    res.render("cart.ejs");
});



app.get("/items",async function(req, res) {
        if (req.session.authenticated) { //if user hasn't authenticated, sending them to login screen
      //this is where the data will be retrieved from the database where you can add or delete items
      //grab all items from mysql
      let Fproducts = await getAllProducts("male");
      let Mproducts = await getAllProducts("female");
      res.render("items",{"Mproducts":Mproducts,"Fproducts":Fproducts});
    }else { 
    
       res.render("login"); 
   
   }
});

app.get("/addItems",function(req, res) {
    if (req.session.authenticated) { //if user hasn't authenticated, sending them to login screen
        //this is where we are going to add items to the database
        res.render("newItem");
        
    }else { 
    
       res.render("login"); 
   
   }
});
app.post("/addItems", async function(req, res){
  //res.render("newAuthor");
  if (req.session.authenticated) { //if user hasn't authenticated, sending them to login screen
      let rows = await insertItem(req.body);
      console.log(rows);
      //res.send("First name: " + req.body.firstName); //When using the POST method, the form info is stored in req.body
      let message = "Item WAS NOT added to the database!";
      if (rows.affectedRows > 0) {
          message= "Item successfully added!";
      }
      res.render("newItem", {"message":message});
   }  else { 
       res.render("login"); 
   }
    
});
// app.get("/deleteItems",function(req, res) {
//      if (req.session.authenticated) { //if user hasn't authenticated, sending them to login screen
//          let rows = await deleteItemM(req.query.uniqueId);
//          console.log(rows);
//           //res.send("First name: " + req.body.firstName); //When using the POST method, the form info is stored in req.body
//           let message = "Item WAS NOT deleted!";
//           if (rows.affectedRows > 0) {
//               message= "Item successfully deleted!";
//           }    
//           let Fproducts = await getAllProducts("male");
//       let Mproducts = await getAllProducts("female");
//       res.render("items",{"Mproducts":Mproducts,"Fproducts":Fproducts});
//   }  else { 
//       res.render("login"); 
//   }
// });


app.get("/login", function(req, res) {
    res.render("login");
    
});
app.post("/loginProcess", function(req, res) {
    
    if ( req.body.username == "admin" && sha256(req.body.password) == "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b") {
       req.session.authenticated = true;
       res.send({"loginSuccess":true});
    } else {
       res.send(false);
    }

    
});

app.get("/logout",function(req, res) {
   req.session.destroy();
   res.redirect("/");//taking the user back to the login screen
});



function getAllProducts(gender){
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
        
          let params = [];
        
          let sql = `SELECT uniqueId, price, imageLink
                     FROM ${gender}Products`;
        
          console.log("SQL:", sql);
          conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
          });
          console.log("done");
        
        });//connect
    });//promise
    
}
function dbConnection(){

   let conn = mysql.createConnection({
                 host: "cst336db.space",
                 user: "cst336_dbUser26",
             password: "qse9zc",
             database: "cst336_db26"
       }); //createConnection

return conn;

}

function deleteItemM(uniqueId){
     let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `DELETE FROM MaleProducts
                      WHERE uniqueId = ?`;
        
           conn.query(sql, [authorId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

function insertItem(body) {
     let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `INSERT INTO MaleProducts
           (typeClothing,price,color, imageLink)
           VALUES (?,?,?,?)`;
        
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
//starting server
app.listen(process.env.PORT, process.env.IP, function(){
console.log("Express server is running...");
});