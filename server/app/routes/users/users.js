// assume all URLs start with /api/users
var User = require('../../../db/models/user.js');
var router = require('express').Router(); // eslint-disable-line new-cap

router.get('/', function(req, res, next){
	User.findAll()
	.then(function(users){
		res.json(users);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	User.findById(id)
	.then(function(user) {
		res.json(user);
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next){
	var id = req.params.id;
	User.findById(id)
	.then(function(user){
		if(user){
			user.destroy();
		}
	}).catch(next);
});

router.put('/:id', function(req, res, next){
	var id = req.params.id;
	User.update(req.body, {where: {id: id}})
	.then(function(){
		res.sendStatus(200);
	})
	.catch(next);
});

module.exports = router;
