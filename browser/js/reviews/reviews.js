app.factory('ReviewFactory', function($http){
	var returnObj = {};

	returnObj.fetchAll = function(productId){
		return $http.get('/api/products/reviews/'+ productId)
		.then(function(reviews){
			return reviews.data;
		})
	}
	return returnObj;
})