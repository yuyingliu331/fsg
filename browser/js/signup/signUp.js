app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signUp',
        templateUrl: 'js/signUp/signUp.html',
        controller: 'SignupCtrl'
    });
});

app.controller('SignupCtrl', function(SignupFactory, $log, $scope) {
    $scope.createUser = SignupFactory.createUser;
});

app.factory('SignupFactory', function(CartFactory, $http, $state, $log, AuthService) {
    var returnObj = {};

    returnObj.createUser = function(userData) {
        AuthService.signup(userData)
        .then(function() {
            CartFactory.migrateCart();
        })
        .catch($log.error)
    };
    
    return returnObj;
});
