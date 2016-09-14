'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const bodyParser = require('body-parser');
var Users = require('../../../db/models/user.js');

module.exports = router;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


router.post('/users', function(req, res, next){
	Users.findOrCreate(req.body)
	.then(function(newUser){
		res.send(newUser.data)
	})
})