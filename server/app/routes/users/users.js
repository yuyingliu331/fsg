// assume all URLs start with /api
var User = require('../../../db/models/user.js');
var router = require('express').Router(); // eslint-disable-line new-cap

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	User.findById(id)
	.then(function(user) {
		res.json(user);
	})
	.catch(next);
});

module.exports = router;