const Item = require('./models/item.js');
const config = require('../../config.js');

module.exports = (req, res) => { 

    Item.find({ownerId: req.decoded._id}, function(err, items) {
        if (err) {
            throw err;
            res.status(409);
        } else {
            res.json(items)
        }
    });
};