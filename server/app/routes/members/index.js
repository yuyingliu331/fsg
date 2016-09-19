'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
}
