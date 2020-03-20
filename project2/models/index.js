var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
MongoClient = require('mongodb').MongoClient;
const url = "mongodb://sampop:Project2@cluster0-shard-00-00-hnxfk.mongodb.net:27017,cluster0-shard-00-01-hnxfk.mongodb.net:27017,cluster0-shard-00-02-hnxfk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost/usersAndItems",{useNewUrlParser: true, useUnifiedTopology: true });



mongoose.Promise = Promise;

module.exports.User = require('./user');

module.exports.Item = require('./item.js');