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

	$scope.category = "default";

	$scope.addToCart = function(product) {
		ProductsFactory.addToCart(product)
		.then(function(product) {
			alert('you added it.');
		});
	}

	$scope.categoryFilter = function(product) {
		if ($scope.category == "default" || $scope.category == "show all") {
			return true;
		}
		else {
			for (var i = 0; i < product.category.length; i++) {
				if (product.category[i] == $scope.category) {
					return true;
				}
			}
			return false;
		}
	};

	$scope.setCategory = function(selected) {
		$scope.category = selected;
	}

	$scope.categories = ['show all', 'fear', 'anxiety', 'everyday experiences', 'sexual tension', 'social', 'adventurous', 'happy', 'nostalgia', 'romance', 'sadness', 'surprise']

});
