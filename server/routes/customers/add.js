const Customer = require('./models/customer.js');
const config = require('../../config.js');

module.exports = (req, res) => {

    var customer = new Customer({
        ownerId: req.decoded._id,
        dateAdded: Date.now(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        details: req.body.details
    });

    customer.save(function (err) {
        if (err) {
            throw err;
            res.status(409).json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
};