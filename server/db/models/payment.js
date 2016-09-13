'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

// salt & hash payment methods for a brownie point

module.exports = db.define('payment', {
	name: {
		type: Sequelize.STRING
	},
	cardNumber: {
		type: Sequelize.STRING
	},
	address: {
		type: Sequelize.TEXT
	},
	expirationDate: {
		typoe: Sequelize.STRING
	}
});