const Customer = require('./models/customer.js');
const config = require('../../config.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = (req, res) => {

    var o_id = new ObjectID(req.body.id);
    var query = {
        _id: o_id,
        ownerId: req.decoded._id
    };
    var values = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        details: req.body.details
    };
    var success = false;
    Customer.updateOne(query, values, function (err) {
        if (err) {
            throw err;
            res.status(400).json({ success: false, message: 'An error occurred.' });
        } else {
            res.json({ success: true, message: 'Item updated successfully.' });
        }
    });
};