'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var Product = require('../../../db/models/products.js');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

// router.get('/secret-stash', ensureAuthenticated, function (req, res) {
    
//     //this is getting all the products for the admin page. 
//     Product.findAll()
//     .then(function(products){
//         theStash = products.map(function(product){ 
//             return product;
//         })
        
//     });
// });
