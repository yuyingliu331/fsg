app.config(function($stateProvider) {
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		// controller: function() {
  //         this.doCheckout = function(token) {
  //           alert("Got Stripe token: " + token.id);
  //         };
  //   }
	})
})
