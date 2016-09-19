// assume all URLs start with /api/products
var Product = require('../../../db/models/products.js');
var Review = require('../../../db/models/reviews.js');
var User = require('../../../db/models/user.js');
var router = require('express').Router(); // eslint-disable-line new-cap

router.get('/', function(req, res, next) {
	Product.findAll()
	.then(function(products) {
		res.json(products);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	Product.findById(id)
	.then(function(product) {
		res.json(product);
	});
});

router.get('/reviews/:id', function(req, res, next) {
	var productId = req.params.id;
	Review.findAll({where: {productId: productId}, include: [{ model: User}]})
	.then(function (reviews) {
		res.json(reviews);
	});
});

router.delete('/:id', function(req, res, next){
  Product.findById(req.params.id)
  .then(function(product){
  product.destroy()
  }).catch(next)

})

router.put('/:id', function(req, res, next){
	Product.update(req.body, { where: { id: req.params.id }})
	.then(function(product){
		res.json(product)
	}).catch(next)
})

router.post('/', function(req, res, next){
	Product.create(req.body)
	.then(function(product){
		res.json(product)
	}).catch(next)
})

module.exports = router;
