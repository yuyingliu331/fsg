app.controller('checkoutCtrl', function($scope, checkoutFactory, $state, $log) {

  $scope.stripeCallback = function (code, result){
    if (result.error) {
      $state.go('paymentDeclined');
    } else {
      checkoutFactory.processCharge(result)
      .then(function(res){
        if (res === 200){
           checkoutFactory.logOrder($scope.orderObj)
           .catch($log.error)
          $state.go('orderConfirmation');
        } else if (res === 400){
          $state.go('paymentDeclined');
        }
      })
      .catch($log.error)
    }
  }

  $scope.createOrderObj = function(){
    $scope.orderObj = {
      address: $scope.address_line1 + ', ' + $scope.address_line2 + ', ' + $scope.address_city + ', ' + $scope.address_state + ', ' + $scope.address_zip,
      status: 'processing'
    }
  }

})
