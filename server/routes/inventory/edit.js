const Item = require('./models/item.js');
const config = require('../../config.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = (req, res) => {

    if (!isNaN(req.body.price)) {
        if (!isNaN(req.body.quantity)) {
            var o_id = new ObjectID(req.body.id);
            var query = {
                _id: o_id,
                ownerId: req.decoded._id
            };
            var values = {
                salePrice: req.body.price,
                purchCost: req.body.cost,
                title: req.body.title,
                sku: req.body.sku,
                quantity: req.body.quantity,
                details: req.body.details
            };
            Item.updateOne(query, values, function (err) {
                if (err) {
                    throw err;
                    res.status(400).json({ success: true, message: 'An error occurred.' });
                } else {
                    res.json({ success: true, message: 'Item updated successfully.' });
                }
            });
        } else {
            res.status(200).json({ success: false, message: 'Values not of correct type.' });
        }
    } else {
        res.status(200).json({ success: false, message: 'Values not of correct type.' });
    }

};