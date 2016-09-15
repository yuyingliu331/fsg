'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products/products.js'));
router.use('/users', require('./users/users.js')); //
router.use('/reviews', require('./reviews/reviews.js')); 

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
