'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
module.exports = db.define('cart', {}, {
	instanceMethods: {
		helpUs: function() {
			console.log("what");
		}
	}
});
