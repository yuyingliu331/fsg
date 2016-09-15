app.factory('ReviewFactory', function($http){
	var returnObj = {};

	returnObj.fetchAll = function(productId){
		return $http.get('/api/products/reviews/'+ productId)
		.then(function(reviews){
			return reviews.data;
		})
	}

	returnObj.saveReview = function (productId, userId, reviewText, reviewTitle, reviewRating){
		var starCount = +reviewRating;
        return $http.post('/api/reviews/'+productId+'/'+userId, { text: reviewText, title: reviewTitle, stars: starCount})
        .then(function(review){
 			return review.data;
        })
	}

	return returnObj;
})