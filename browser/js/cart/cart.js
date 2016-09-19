app.config(function($stateProvider) {
	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: 'js/cart/cart.html',
		controller: 'CartCtrl'
	});
});

app.controller('CartCtrl', function($state, $scope, CartFactory, AuthService) {
	// is an array of product IDs for not logged in, when logged in becomes a promise for a cart object htat has an array of product objects
	// problem because if we're finding user by session.user, every time page refreshes it doessn't persist...
	CartFactory.getCart()
	.then(function(cart) {
		$scope.cart = cart;
	});

	AuthService.getLoggedInUser()
	.then(function(user) {
		$scope.user = user;
	})

	$scope.qtyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	$scope.removeFromCart = function(productId, userId) {
		CartFactory.removeFromCart(productId, userId)
		.then(function(cart) {
			return CartFactory.getCart();
			//$state.reload();
		})
		.then(function(cart) {

			$scope.cart = cart;
		});
	}
});

app.factory('CartFactory', function(AuthService, Session, $http, $q) {
	var returnObj = {};

	returnObj.removeFromCart = function(productId, userId) {

		return AuthService.getLoggedInUser()
		.then(function(user) {
			if (user) {
				return $http.get('/api/carts/' + userId)
				.then(function(cart) {
					return $http.delete("/api/carts/" + cart.data.id + "/" + productId)
				})
			}
			else {
				var cart = JSON.parse(localStorage.getItem('cart'));
				var index = cart.indexOf(productId);
				cart.splice(index, 1);
				localStorage.setItem('cart', JSON.stringify(cart));
			}	
		});
	}

	returnObj.getCart = function() {
		return AuthService.getLoggedInUser()
		.then(function(user) {
			// if a user is logged in, get the cart from the database. if not, get it from localstorage.
			if (user) {
				return $http.get('/api/carts/' + user.id)
				.then(function(cart) {
					// cart.data.products is an array of products that are in the cart
					return cart.data.products;
				});
			}
			else {
				var cartArr = [];
				var ids = JSON.parse(localStorage.getItem('cart'));
				// reduces array to only unique IDs
				ids = returnObj.uniqueIds(ids);
				// for each of the IDs in the localStorage cart item, it makes a get
				// request to that product's api page and stores that product object
				// in an array.
				ids = ids.map(function(id) {
					return $http.get('/api/products/' + id)
					.then(function(product) {
						return product.data;
					});
				});
				return $q.all(ids);
			}
			
		});
	}

	returnObj.uniqueIds = function(arr) {
    	var uniques = [];
    	for (var i = 0, l = arr.length; i < l; i++)
        if (uniques.indexOf(arr[i]) === -1) {
            uniques.push(arr[i]);
        }
    	return uniques;
	}

	return returnObj;
});