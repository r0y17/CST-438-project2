
// itemSchema = new mongoose.Schema({
//     name:String,
//     quantity: Number,
//     description: String,
//     price: mongoose.Decimal128,
//     isAvailable: {
//         type: Boolean,
//         default: true
//     }

// })

// userSchema = new mongoose.Schema({
//     userName: String,
//     password: String,
//     itemsInCart: [
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Item"
//         }
//     ]
// });
// userSchema.plugin(passportLocalMongoose);

// var User = mongoose.model("User",userSchema);
// var Item = mongoose.model("Item",itemSchema);

// module.exports = Item;
// module.exports = User;

