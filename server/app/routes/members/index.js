'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var db = require('../../../db/index.js');
var Product = db.model('product');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};
