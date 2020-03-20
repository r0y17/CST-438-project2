var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../routes/helper');


router.route('/')
    .get(helpers.getItem)
    .post(helpers.createItem)


router.route('/:itemId')
    .get(helpers.getItemById)
    .put(helpers.updateItem)
    .delete(helpers.deleteItem)

// router.route('/login')
//     .get()


module.exports = router;