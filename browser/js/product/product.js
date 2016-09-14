app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
		// add controller??
	})
})

app.controller('ProductCtrl', function($scope, $stateParams, ProductFactory, ReviewFactory) {
	console.log('here?');
	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product; // one product
	});

	
	ReviewFactory.fetchAll($stateParams.id)
	.then(function(reviews) {
		$scope.reviews = reviews; 
		// $scope.stars = reviews.map(function(review) {
		// 	return +review.stars;
		// })
	});

	$scope.getTimes=function(n){
    	return new Array(n);
	};
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


