// assume all URLs start with /api
var Product = require('../../../db/models/products.js');
var Review = require('../../../db/models/reviews.js');
var router = require('express').Router(); // eslint-disable-line new-cap

router.get('/', function(req, res, next) {
	Product.findAll()
	.then(function(products) {
		res.json(products);
	})
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	Product.findById(id)
	.then(function(product) {
		res.json(product);
	})
});

router.get('/reviews/:id', function(req, res, next) {
	var productId = req.params.id;
	Review.findAll({where: {productId: productId}})
	.then(function (reviews) {
		res.json(reviews);
	})
})

module.exports = router;