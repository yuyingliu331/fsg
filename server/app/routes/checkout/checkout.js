// assume all routes start with api/checkout

var router = require('express').Router();
var stripe = require('stripe')('sk_test_lsEvv4vV5poxI8yzfylBEJE1');
module.exports = router;

router.post('/', function(req, res, next){
  var token = req.body.stripeToken;
  console.log('made it to the back end with this token ', token);

  // Create a charge: this will charge the user's card
  var charge = stripe.charges.create({
    amount: 1000, // Amount in cents
    currency: 'usd',
    source: token,
    description: 'Example charge'
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
})
