'use strict'
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('reviews', {
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT,
    validate: {
      min: 25// this is not going to work, for numeric values?
    }
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})
