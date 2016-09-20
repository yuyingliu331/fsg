// app.config(function($stateProvider) {
// 	$stateProvider.state('user', {
// 		url: '/user',
// 		templateUrl: 'js/user/user.html',
// 		controller: 'UserCtrl'
// 	})
// })

app.factory('UserFactory', function($http) {
	var returnObj = {};
	returnObj.findUser = function(userId) {
		return $http.get('/api/users/' + userId)
		.then(function(user) {
			return user.data;
		})
	};

	returnObj.findAll = function(){
		return $http.get('/api/users/')
		.then(function(users){
			return users.data;
		})
	}

	returnObj.delete = function(userId){
		return $http.delete('/api/users/'+userId)
		.then(function(user){
			return user.data;
		})
	}

	returnObj.updatePassword = function(newPw, id){

		return $http.put('/api/users/' + id, { password: newPw })
		.then(function(thing){
			//TODO
			return user.data;
		})
	}
	return returnObj;
})

app.controller('UserCtrl', function($scope, UserFactory,userToUpdate){
	$scope.userName = userToUpdate.name;
	$scope.updatePassword = function(pw){
        UserFactory.updatePassword(pw, userToUpdate.id)
        .then(function(user){
        	alert('password was updated!');
        })
	}
})

app.config(function($stateProvider) {
	$stateProvider.state('updatePw', {
		url: '/user/:id',
		templateUrl: 'js/user/user.html',
		controller: 'UserCtrl',
		resolve: {
			userToUpdate: function(UserFactory, $stateParams){
				return UserFactory.findUser($stateParams.id);
			}
		}
	})
})
