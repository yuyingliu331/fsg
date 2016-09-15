app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
	})
})

app.controller('ProductCtrl', function(Session, $scope, $stateParams, ProductFactory, ProductsFactory) {
	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product;
	});

	$scope.addToCart = function(productId) {
		if (!Session.user) {
			if (!localStorage.getItem('cart')) {
				var newcart = ProductsFactory.initializeCart(productId)
				localStorage.setItem('cart', JSON.stringify(newcart));
			}
			else {
				var cart = ProductsFactory.updateCart(productId);
				localStorage.setItem('cart', JSON.stringify(cart));
			}
		}
		else {
			ProductsFactory.addToCart(productId)
			.then(function(productId) {
				alert('you added it.');
			});	
		}
	}
});

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
