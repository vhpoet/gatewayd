var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {

  var opts = {
    name: req.body.name,
    password: req.body.password,
    ripple_address: req.body.ripple_address
  };

  api.registerUser(opts, function(err, user){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ user: user });
    }
  });
  
};
