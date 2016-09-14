app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
		// add controller??
	})
})

app.controller('ProductCtrl', function($scope, $stateParams, ProductFactory) {
	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product;
	});
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
