app.controller('CreateUser', function($scope, Users){
      $scope.createUser = function(userData){
      	Users.createUser(userData)
      	.then(function(newUser){
      		$state.go('home');
      	// 	$state.go('userProfile', {id: newUser.id})
      	// ^ once we also set up user profile view
      	})

})
})