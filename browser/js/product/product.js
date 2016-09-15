app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
		// add controller??
	})
})

app.controller('ProductCtrl', function($scope, $stateParams, ProductFactory, ReviewFactory) {
	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product; // one product
	});

	
	ReviewFactory.fetchAll($stateParams.id)
	.then(function(reviews) {
		$scope.reviews = reviews; 
		// $scope.users = reviews.map(function(review) {
		//  	return findUser(review.userId);
		// })
	});

	$scope.getTimes=function(n){
    	return new Array(n);
	};

	// function findUser = UserFactory.findUser($stateParams.id)
	// .then(function(users){
	// 	return users;
	// })

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


