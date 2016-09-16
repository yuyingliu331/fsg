// assume all URLs start with /api/reviews

var Review = require('../../../db/models/reviews.js');
var router = require('express').Router(); // eslint-disable-line new-cap

router.post('/:pId/:uId', function(req, res, next) {
	req.body.productId = req.params.pId;
	req.body.userId = req.params.uId;
	Review.create(req.body)
	.then(function(review) {
		res.json(review);
	})
	.catch(next);
});

module.exports = router;
