var mongoose = require('mongoose');


itemSchema = new mongoose.Schema({
    name:String,
    quantity: Number,
    description: String,
    price: mongoose.Decimal128,
    isAvailable: {
        type: Boolean,
        default: true
    }

})

var Item = mongoose.model("Item",itemSchema);

module.exports = Item;
