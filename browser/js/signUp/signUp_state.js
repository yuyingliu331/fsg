
app.config(function($stateProvider){
      $stateProvider.state('signup', {
      	    url: '/signUp',
      	    templateUrl: 'js/signUp/signUp.html',
      	    controller: 'CreateUser'
            
      })
})