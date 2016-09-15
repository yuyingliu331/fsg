// assume all routes start with /api/carts

var db = require('../../../db/index.js');
var Cart = db.model('cart');
var Product = db.model('product');
var router = require('express').Router(); // eslint-disable-line new-cap

router.put('/:userId', function(req, res, next) {
	Cart.findOrCreate({
		where: {
			userId: req.params.userId
		}
	})
	.spread(function(cart) {
		return cart.addProduct(req.body.productId)
	})
	.then(function(something){
		res.send(200);
	})
	.catch(next);
})

router.get('/:userId', function(req, res, next) {
	Cart.findOne({
			where: {
				userId: req.params.userId
			},
			include: [Product]
	})
	.then(function(cart) {
		res.send(cart);
	})
})

module.exports = router;