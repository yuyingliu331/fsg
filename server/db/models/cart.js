'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
module.exports = db.define('cart', {
	quantity: {
		type: Sequelize.INTEGER // quantity of each product
	}
});
