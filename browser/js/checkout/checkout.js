app.config(function($stateProvider) {
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
    controller: function($scope) {
          // Stripe publisher key
      //$window.Stripe.setPublishableKey('pk_test_S0oFek96V9yeMMQdI3aE0A65');
      $scope.stripeCallback = function (code, result){
        if (result.error) {
          alert('it failed! error: ' + result.error.message);
        } else {
          alert('sucess! token: ' + result.id);
        }
      }
    }
	})
})
