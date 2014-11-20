var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {

  api.listQueuedDeposits(function(err, deposits){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ deposits: deposits });
    }
  });
  
};

