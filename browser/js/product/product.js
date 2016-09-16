app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:id',
		templateUrl: 'js/product/product.html',
		controller: 'ProductCtrl'
	})
})

app.controller('ProductCtrl', function(Session, $scope, $stateParams, ProductFactory, ProductsFactory, ReviewFactory, UserFactory) {

	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product; // one product
	});

	ReviewFactory.fetchAll($stateParams.id)
	.then(function(reviews) {
		$scope.reviews = reviews;
	});

    //TODO: we need to use the login function to map the user here!!!
    //Should not hard code.
	var userId = 1;
    UserFactory.findUser(userId)
    .then(function(user){
    	$scope.user = user;
    });

    $scope.saveReview = function(productId, userId, reviewText, reviewTitle, reviewRating) {
    	ReviewFactory.saveReview(productId, userId, reviewText, reviewTitle,reviewRating)
    	.then(function(review) {
    		$scope.newReview = review;
    		$scope.review.title = "";
    		$scope.review.text = "";
    	})
    }

	$scope.getTimes=function(n){
    	return new Array(n);
	};

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


