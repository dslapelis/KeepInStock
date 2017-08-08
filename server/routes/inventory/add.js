const Item = require('./models/item.js');
const config = require('../../config.js');

module.exports = (req, res) => {

    if (!isNaN(req.body.price)) {
        if (!isNaN(req.body.quantity)) {

            var item = new Item({
                ownerId: req.decoded._id,
                purchCost: req.body.cost,
                salePrice: req.body.price,
                title: req.body.title,
                sku: req.body.sku,
                quantity: req.body.quantity,
                details: req.body.details
            });

            item.save(function (err) {
                if (err) {
                    throw err;
                    res.status(409).json({ success: false });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            console.log("DEBUG: Quantity is not an integer.")
            res.status(200).json({ success: false, message: 'Values not of correct type.' });
        }
    } else {
        console.log("DEBUG: Price is not a double.")
        res.status(200).json({ success: false, message: 'Values not of correct type.' });
    }
};