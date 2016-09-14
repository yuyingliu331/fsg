app.factory('Users', function($http){
   var User = {};
   User.createUser = function(data){
    return $http.post('/api/users', data)
    .then(function(users){
    	return users.data;
    })
}

    return User;
})