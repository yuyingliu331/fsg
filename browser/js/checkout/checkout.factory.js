
app.factory('CheckoutFactory', function($http, $log, AuthService){
  var returnObj = {};

    returnObj.cart = [];

    returnObj.processCharge = function(token) {
      return $http.post('api/checkout', token)
      .then(function(res){
        return res.status;
      })
      .catch($log.error);
    };

    returnObj.logOrder = function(orderDetails) {
      // function will pass shipping address to the database
      // and connect cart to order
      return AuthService.getLoggedInUser()
      .then(function(user) {
        if (user) {
          orderDetails.email = user.email;
        }
        else {
          // lol we'll do that
        }

        orderDetails.products = returnObj.cart;
        orderDetails.total = returnObj.sum(returnObj.cart);
        return $http.post('api/checkout/order', orderDetails)
        .catch($log.error);
      })
    };

    returnObj.grabCart = function(cart) {
      returnObj.cart = cart;
    };

    returnObj.sum = function(cart) {
      var sum = 0;
      cart.forEach(function(product) {
        sum += product.productSum;
      });
      return sum;
    };

    return returnObj;
});
