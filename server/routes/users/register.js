var User = require('./models/user.js');
const passwordHash = require('password-hash');
var stripe = require('stripe')(
  "sk_test_uP94w32DrTTocGgCB9jCK09S"
);

module.exports = (req, res) => {

  if (req.body.name && req.body.password && req.body.email && req.body.phone 
      && req.body.stripeToken) {
    console.log("DEBUG: Correct number of params");
    // checking to see if user exists with that email
    User.count({ 'email': req.body.email },
               function (err, count) {

      if (count <= 0) {
        stripe.customers.create({
          email: req.body.email,
          source: req.body.stripeToken
        }).then(function(customer){

          var hashedPassword = passwordHash.generate(req.body.password);
          
          var user = new User({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone,
            dateJoined: Date.now(),
            custId: customer.id
          });

          // we create the user if they don't exist
          user.save(function (err) {
            if (err) {
              console.log(err);
              res.status(400).json({ success: false });
            }
          });

          return stripe.subscriptions.create({
            customer: customer.id,
            items: [{
              plan: "free"
            }]
          }, function(err, subscription) {
            res.json({ success: true });
          })  
        });

      } else {
        console.log('User already registered.')
        res.status(400).json({ success: false });
      }
    });
  } else {
    // email is already registered
    console.log('Bad params.');
    res.status(400).json({ success: false });
  }
}
