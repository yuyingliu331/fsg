app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductsCtrl'
		// add controller??
	})
})

// app.controller('ProductCtrl', function($scope, $stateParams, ProductFactory, ProductsFactory) {
// 	ProductFactory.fetchOne($stateParams.id)
// 	.then(function(product) {
// 		$scope.product = product;
// 	});

// 	$scope.addToCart = function(productId) {
// 		if (!$scope.loggedIn) {
// 			if (!localStorage.getItem('cart')) {
// 				console.log("supposedly creating the cart")
// 				$scope.cart = new ProductsFactory.Cart(productId)
// 				localStorage.setItem('cart', JSON.stringify($scope.cart));
// 			}
// 			else {
// 				$scope.cart.ids.push(productId);
// 				localStorage.setItem('cart', JSON.stringify($scope.cart));
// 			}
// 		}
// 		// ProductsFactory.addToCart(product)
// 		// .then(function(product) {
// 		// 	alert('you added it.');
// 		// });
// 	}

// });

app.factory('ProductFactory', function($http) {
	var returnObj = {};

	returnObj.fetchOne = function(id) {
		return $http.get('/api/products/' + id)
		.then(function(product) {
			return product.data;
		});
	}

	return returnObj;
})
