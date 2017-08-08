var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Our user model.
var Item = new Schema({
    ownerId: String,
    purchCost: Number,
    salePrice: Number,
    title: String,
    sku: String,
    quantity: Number,
    details: String,
});

module.exports = mongoose.model('Item', Item);  