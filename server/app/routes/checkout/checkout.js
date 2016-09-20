// assume all routes start with api/checkout

var router = require('express').Router();
var stripe = require('stripe')('sk_test_awkht6sVaMH780dpIAF7xQ0z');

var db = require('../../../db/index.js');
var Cart = db.model('cart');
var Order = db.model('order');
module.exports = router;

router.post('/', function(req, res, next){
  var token = req.body.id;
  var charge = stripe.charges.create({
    amount: 1000, // Amount in cents, needs to be variable relating to cart total
    currency: 'usd',
    source: token,
    description: 'Example charge'
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      //declined charge
      res.sendStatus(400);
    }
    if (charge) {
      //order success!
      res.sendStatus(200);
    }
  });
})

router.post('/order', function(req, res, next) {
  console.log(req.body)
  Order.create(req.body)
  .then(function(order){
    //order needs to be connected to Cart before responding
    if(!order) res.sendStatus(500)
    res.sendStatus(200)
  })
  .catch(next)
})
