app.config(function($stateProvider) {
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
    controller: function($scope) {
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
