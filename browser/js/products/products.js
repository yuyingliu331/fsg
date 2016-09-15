app.config(function($stateProvider) {
	$stateProvider.state('products', {
		url: '/products',
		templateUrl: 'js/products/products.html',
		controller: 'ProductsCtrl'
	});
});

app.factory('ProductsFactory', function(Session, $http) {
	var returnObj = {};

	returnObj.cart = {};

	returnObj.initializeCart = function(productId) {
		this.cart = new this.Cart(productId);
		return this.cart;
	}

	returnObj.updateCart = function(productId) {
		this.cart = JSON.parse(localStorage.getItem('cart'));
		this.cart.ids.push(productId);
		return this.cart;
	}

	returnObj.fetchAll = function() {
		return $http.get('/api/products')
		.then(function(products) {
			return products.data;
		});
	}

	returnObj.addToCart = function(productId) {
		// locating cart based on user ID because cart is associated w user
		return $http.put('/api/carts/'  + Session.user.id, {productId: productId})
		.then(function(cart) {
			return alert('it was added to cart in DB');
		});
	}

	returnObj.Cart = function(id) {
		this.ids = [id];
	}

	return returnObj;
});

app.controller('ProductsCtrl', function(Session, AuthService, AUTH_EVENTS, $stateParams, $scope, ProductFactory, ProductsFactory, $rootScope) {
	$scope.loggedIn = false;

	ProductsFactory.fetchAll()
	.then(function(products) {
		$scope.products = products;
	});

	ProductFactory.fetchOne($stateParams.id)
	.then(function(product) {
		$scope.product = product;
	});

	$scope.category = "default";

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
