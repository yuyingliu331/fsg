'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');
module.exports = db.define('order', {
	//each row is an order
	// order can have many products; just do what's unique to each order
	// quantity & subtotal are virtual
	purchaseTime: {
		type: Sequelize.DATE //set virtuals for getting purchaseTime & Date separately?
	},
	address: {
		type: Sequelize.TEXT
	},
	status: {
		type: Sequelize.ENUM('processing', 'cancelled', 'completed')
	}
});
