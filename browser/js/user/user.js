app.config(function($stateProvider) {
	$stateProvider.state('user', {
		url: '/user',
		templateUrl: 'js/user/user.html'
		
	})
})


app.factory('UserFactory', function($http) {
	var returnObj = {};
	returnObj.findUser = function(userId) {
		console.log("did we get factory for users? ", userId);
		return $http.get('/api/users/' + userId)
		.then(function(user) {
			console.log("users", user);
			return user.data;
		})
	}
	return returnObj;
})
