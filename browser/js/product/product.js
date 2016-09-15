app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
		// add controller??
	})
})

app.controller('ProductCtrl', function($scope, $stateParams, ProductFactory, ReviewFactory, UserFactory) {
	
	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		console.log("if we get here? ");
		$scope.product = product; // one product
	});
    
	
	ReviewFactory.fetchAll($stateParams.id)
	.then(function(reviews) {
		console.log("do we have reviews?");
		$scope.reviews = reviews; 
		// $scope.users = reviews.map(function(review) {
		//  	return findUser(review.userId);
		// })
	});
    
	var userId = 1;
    UserFactory.findUser(userId)
    .then(function(user){
    	console.log("user:", user);
    	$scope.user = user;
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


