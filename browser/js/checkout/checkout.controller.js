app.controller('CheckoutCtrl', function($scope, CartFactory, CheckoutFactory, $state, $log) {
  var orderObj = {};

  CartFactory.getCart()
  .then(function(cart) {
    $scope.cart = cart;
  });

  $scope.createOrderObj = function() {
    orderObj = {
      address:  $scope.address_line2 ? $scope.address_line1 + ', ' + $scope.address_line2 + ', ' + $scope.address_city + ', ' + $scope.address_state + ', ' + $scope.address_zip : $scope.address_line1 + ', ' + $scope.address_city + ', ' + $scope.address_state + ', ' + $scope.address_zip,
      status: 'processing'
    };
  }

  $scope.stripeCallback = function (code, result){
    if (result.error) {
      $state.go('paymentDeclined');
    } else {
      CheckoutFactory.processCharge(result)
      .then(function(res){
        if (res === 200){
           CheckoutFactory.logOrder(orderObj)
           .catch($log.error)
          $state.go('orderConfirmation');
        } else if (res === 400){
          $state.go('paymentDeclined');
        }
      })
      .catch($log.error)
    }
  };
});
