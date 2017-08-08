const Item = require('./models/item.js');
const config = require('../../config.js');
var ObjectID = require('mongodb').ObjectID;


module.exports = (req, res) => {

    if (req.body.id) {
        var o_id = new ObjectID(req.body.id);
        var query = {
            _id: o_id,
            ownerId: req.decoded._id
        };

        Item.remove(query, function (err) {
            if (err) {
                throw(err);
                res.status(400).json({ success: true, message: 'An error occurred.' });
            } else {
                res.json({ success: true, message: 'Item deleted successfully.' });

            }
        });
    } else {
        res.status(409).json({ success: false, message: 'Incorrect number of parameters' });
    }

};