var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {

  api.activateUser(req.params.id, function(err, user){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ user: user });
    }
  });
  
};

