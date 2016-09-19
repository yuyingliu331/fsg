app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
	});
});

app.controller('ProductCtrl', function(Session, AuthService, $scope, $stateParams, ProductFactory, ProductsFactory, ReviewFactory) {

	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product;
	});

	ReviewFactory.fetchAll($stateParams.id)
	.then(function(reviews) {
    console.log(reviews);
		$scope.reviews = reviews;
	});

	var loggedInUser;

	AuthService.getLoggedInUser()
    .then(function(user){
      loggedInUser = user;
      $scope.loggedInUserName = user.name;
    });

    $scope.saveReview = function(productId, reviewText, reviewTitle, reviewRating) {
	ReviewFactory.saveReview(productId, loggedInUser.id, reviewText, reviewTitle, reviewRating)
	.then(function(review) {
		$scope.newReview = review;
		$scope.review.title = '';
		$scope.review.text = '';
	});
};

	$scope.getTimes = function(stringLength){
	        return new Array(stringLength);
	};

	$scope.addToCart = function(productId) {
		if (!Session.user) {
			if (!localStorage.getItem('cart')) {
				var newcart = ProductsFactory.initializeCart(productId);
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
			});
		}
	};

});

app.factory('ProductFactory', function($http) {
	var returnObj = {};

	returnObj.fetchOne = function(id) {
		return $http.get('/api/products/' + id)
		.then(function(product) {
			return product.data;
		});
	};

	returnObj.add = function(){
		return $http.post('/api/product/')
		.then(function(product){
			return product.data;
		});
	};

	returnObj.delete = function(id){
		return $http.delete('/api/product/' + id)
		.then(function(product){
			return product.data;
		});
	};

	returnObj.edit = function(id, body){
		return $http.put('/api/product/' + id, { description: body})
		.then(function(product){
			return product.data;
		});
	};

    return returnObj;
});

