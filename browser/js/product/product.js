app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl'
    });
});

app.controller('ProductCtrl', function(CartFactory, $log, Session, AuthService, $scope, $stateParams, ProductFactory, ReviewFactory) {
    var loggedInUser;

    ProductFactory.fetchOne($stateParams.id)
    .then(function(product) {
        $scope.product = product;
    });

    ReviewFactory.fetchAll($stateParams.id)
    .then(function(reviews) {
        $scope.reviews = reviews;
    })
    .catch($log.error);

    AuthService.getLoggedInUser()
    .then(function(user) {
        loggedInUser = user;
        $scope.loggedInUserName = user.name;
    })
        .catch($log.error);

    $scope.saveReview = function(productId, reviewText, reviewTitle, reviewRating) {
        ReviewFactory.saveReview(productId, loggedInUser.id, reviewText, reviewTitle, reviewRating)
        .then(function(review) {
            $scope.newReview = review;
            $scope.review.title = '';
            $scope.review.text = '';
        })
        .catch($log.error);
    };

    $scope.getTimes = function(stringLength) {
        return new Array(stringLength);
    };

    $scope.addToCart = CartFactory.routeToAdderFunc;
});

app.factory('ProductFactory', function($http, $log) {
    var returnObj = {};

    returnObj.fetchOne = function(id) {
        return $http.get('/api/products/' + id)
        .then(function(product) {
            return product.data;
        })
        .catch($log.error);
    };

    returnObj.add = function() {

        return $http.post('/api/products/')

        .then(function(product) {
            return product.data;
        })
        .catch($log.error);
    };

    returnObj.delete = function(id) {

        return $http.delete('/api/products/' + id)

        .then(function(product) {
            return product.data;
        })
        .catch($log.error);
    };

    returnObj.edit = function(id, body) {
        return $http.put('/api/product/' + id, {
                description: body
            })
        .then(function(product) {
            return product.data;
        })
        .catch($log.error);
    };

    return returnObj;
});
