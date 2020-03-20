var db = require("../models");

exports.getItem = (req,res) => {
    db.Item.find()
    .then((item) => {
        res.json(item);
    })
    .catch((err) => {
        res.send(err);
    })
};

// exports.getUserById = (req,res) => {
//     db.User.findById()
//     .then((user) => {
//         res.json(user);
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// };


exports.addItemToCart = (req,res) => {
    db.User.findById(req.params.userId).populate("itemsInCart").exec((err,foundUser) => {
        if(err) {
            console.log(err);
        } else {
            User.create(req.body.item,(err,item) => {
                if(err) {
                    console.log(err)
                } else {
                    foundUser.itemsInCart.push(item);
                    item.findById({_id: item._id}, {$inc :{qiantity: -1}});
                    foundUser.save();
                }
            })
        }
    })
}

exports.removeItemInCart = (req,res) => {
    db.User.findById(req.params.userId).populate("itemsInCart").exec((err,foundUser) => {
        if(err) {
            console.log(err);
        } else {
            User.create(req.body.item,(err,item) => {
                if(err) {
                    console.log(err)
                } else {
                    foundUser.itemsInCart.pull(item);
                    item.findById({_id: item._id}, {$inc :{qiantity: 1}});
                    foundUser.save();
                }
            })
        }
    })
}

exports.createItem = (req,res) => {

    db.Item.create(req.body)
    .then(function(newItem) {
        // console.log(newTodo);
        res.status(201).json(newItem);
        console.log("Done");
    })
    .catch((err) => {
        res.send(err);
    })
};

exports.updateItem = (req,res) => {
    db.Item.findOneAndUpdate({_id: req.params.itemId},req.body,{isAvailable:false})
    .then((item) => {
        res.json(item);
    })
    .catch((err) => {
        res.send(err);
    });
    
};

exports.deleteItem = (req,res) => {
    db.Item.remove({_id: req.params.itemId}).then(() => {
        res.json({message: "we deleted it"});
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.getItemById = (req,res) => {
    db.Todo.findById(req.params.itemId)
    .then((todo) => {
        res.json(todo);
    })
    .catch((err) => res.send(err));
};



module.exports = exports;