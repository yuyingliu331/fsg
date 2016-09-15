app.config(function($stateProvider) {
	$stateProvider.state('user', {
		url: '/user',
		templateUrl: 'js/user/user.html'
		
	})
})


// app.factory('UserFactory', function($http) {
// 	var returnObj = {};
// 	returnObj.findUser = function(userId) {
// 		 $http.get('/api/users/' + userId)
// 		.then(function(user) {
// 			return user.data;
// 		})
// 	}
// 	return returnObj;
// })
// 	return returnObj;
	// TODO:
 	// 2) inject UserFactory to productController
	// 3) display username on html
// })
