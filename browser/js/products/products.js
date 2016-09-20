app.value('ProductCategories', ['show all', 'fear', 'anxiety', 'everyday experiences', 'sexual tension', 'social', 'adventurous', 'happy', 'nostalgia', 'romance', 'sadness', 'surprise']);

app.config(function($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl'
    });
});

app.factory('ProductsFactory', function($http, $log) {
    var returnObj = {};

    returnObj.cart = {};

    returnObj.fetchAll = function() {
        return $http.get('/api/products')
        .then(function(products) {
            return products.data;
        })
        .catch($log.error);
    };

    return returnObj;
});

app.controller('ProductsCtrl', function(ProductCategories, CartFactory, $log, $stateParams, $scope, ProductsFactory) {
    $scope.loggedIn = false;

    ProductsFactory.fetchAll()
    .then(function(products) {
        $scope.products = products;
    })
    .catch($log.error);

    $scope.addToCart = CartFactory.routeToAdderFunc;

    $scope.category = 'default';

    $scope.categoryFilter = function(product) {
        if ($scope.category === 'default' || $scope.category === 'show all') {
            return true;
        } else {
            for (var i = 0; i < product.category.length; i++) {
                if (product.category[i] === $scope.category) {
                    return true;
                }
            }
            return false;
        }
    };

    $scope.setCategory = function(selected) {
        $scope.category = selected;
    };

    $scope.categories = ProductCategories;
});
