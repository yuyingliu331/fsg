app.config(function($stateProvider) {
	$stateProvider.state('products', {
		url: '/products',
		templateUrl: 'js/products/products.html',
		controller: 'ProductsCtrl'
	});
});

app.factory('ProductsFactory', function($http) {
	var returnObj = {};

	returnObj.fetchAll = function() {
		return $http.get('/api/products')
		.then(function(products) {
			return products.data;
		});
	}

	returnObj.addToCart = function(product) {
		$http.post('/api/cart/' /* + USER ID????????*/)
		.then(function(product) {
			alert('it was added to cart in DB');
		});
	}

	return returnObj;
});

app.controller('ProductsCtrl', function($scope, ProductsFactory) {
	ProductsFactory.fetchAll()
	.then(function(products) {
		$scope.products = products;
	});

	$scope.addToCart = function(product) {
		ProductsFactory.addToCart(product)
		.then(function(product) {
			alert('you added it.');
		});
	}
});
