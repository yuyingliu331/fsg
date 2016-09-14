app.controller('CreateUser', function($scope, AuthService, $state){
      $scope.createUser = function(userData){
        AuthService.signup(userData)
        .then( function(){
          $state.go('home')
        })
      }
})
