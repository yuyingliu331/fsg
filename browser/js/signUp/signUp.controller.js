app.controller('CreateUser', function($scope, AuthService, ProductsFactory, $state){
      $scope.createUser = function(userData){
        AuthService.signup(userData)
        .then( function(){
        	var cart = JSON.parse(localStorage.getItem('cart'));
            if (cart) {
                cart.ids.forEach(function(product) {
                    ProductsFactory.addToCart(product)   
                });
            }
          $state.go('home')
        })
      }
})
