app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        templateUrl: 'js/members-only/members-only.html',
        controller: 'AdminController',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
            //add checking admin is true or not.
        }
    });

});

app.controller('AdminController', function($scope, ProductsFactory){

    ProductsFactory.fetchAll()
    .then(function(products) {
        $scope.products = products;
    });

})

