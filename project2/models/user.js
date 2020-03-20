var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    itemsInCart: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Item"
        }
    ]
});
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User",userSchema);

module.exports = User;