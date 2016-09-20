app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        templateUrl: 'js/members-only/members-only.html',
        controller: 'AdminController',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true,
            //add checking admin is true or not.
        }
    });

});

app.controller('AdminController', function($scope, ProductsFactory, ProductFactory, $state, UserFactory){

    ProductsFactory.fetchAll()
    .then(function(products) {
        $scope.products = products;
    });

    $scope.edit = function(productId){
        $state.go('product', { id: productId });
    };

    $scope.delete = function(productId){
        ProductFactory.delete(productId)
        .then(function(){
            $state.go('products');
        }).catch(new Error());
    };
    $scope.add = function(){
        $state.go('addNewProduct');
    };

    UserFactory.findAll()
    .then(function(users){
        $scope.users = users;
    });

    $scope.edit = function(userId){
        $state.go('user', { id: userId });
    };

    $scope.deleteUser = function(userId){
        UserFactory.delete(userId)
        .then(function(){
            $state.go('users');
        }).catch(new Error());
    };
    $scope.resetPw = function(userId){
        $state.go('updatePw',  {id: userId});
    };


})
