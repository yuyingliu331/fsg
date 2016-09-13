'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Order = require('./models/order');
var Cart = require('./models/cart');
var Payment = require('./models/payment');
var Product = require('./models/products');
var Review = require('./models/reviews');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

Order.belongsTo(User);
Cart.belongsTo(User);
Cart.hasMany(Products);
Payment.belongsTo(Order);
Review.belongsTo(User);
Review.belongsTo(Product);





