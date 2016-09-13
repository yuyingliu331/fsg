'use strict'
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.ARRAY,
    set: function (value) {
      var arrayOfCategories;
      if (typeof value === 'string') {
          arrayOfCategories = value.split(',').map(function (s) {
              return s.trim();
          });
          this.setDataValue('category', arrayOfCategories);
      } else {
          this.setDataValue('category', value);
      }
    }
  },
  photo: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},{
  getterMethods: {
    preview: function() { return this.description.split(0,40) + "..." }
  }
  //virtual to put price into monetary form?
}
)
