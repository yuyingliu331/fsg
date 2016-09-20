
app.factory('checkoutFactory', function($http, $log){
  return {
    processCharge: function(token){
      return $http.post('api/checkout', token)
      .then(function(res){
        return res.status;
      })
      .catch($log.error);
    },
    logOrder: function(orderDetails){
      //function will pass shipping address to the database
      //and connect cart to order
      console.log('in checkoutFactory!')
      return $http.post('api/checkout/order', orderDetails)
      .catch($log.error)
    }
  }
})
