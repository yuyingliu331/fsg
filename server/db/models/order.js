'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
module.exports = db.define('order', {
	address: {
		type: Sequelize.TEXT
	},
	status: {
		type: Sequelize.ENUM('processing', 'cancelled', 'completed')
	},
	products: {
		type: Sequelize.ARRAY(Sequelize.JSON)
	},
	total: {
		type: Sequelize.INTEGER
	},
	email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});
