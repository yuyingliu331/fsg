app.config(function ($stateProvider) {
    $stateProvider.state('addNewProduct', {
        url: '/addNewProduct',
        templateUrl: 'js/addNewProduct/addProduct.html',
		controller: 'AdminController'
    });

});
