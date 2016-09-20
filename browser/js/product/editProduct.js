app.config(function ($stateProvider) {
	$stateProvider.state('edit', {
	url: '/editProduct/:id',
	templateUrl: 'js/product/product.html',
	controller: 'ProductCtrl'
  });
});

