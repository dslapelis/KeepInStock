var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Our user model.
var Customer = new Schema({
    ownerId: String, // ID of the account who added this customer
    dateAdded: Date,
    name: String,
    email: String,
    phone: String,
    address: String,
    dob: Date,
    details: String
    // to-do: add purchases history
});

module.exports = mongoose.model('Customer', Customer);  