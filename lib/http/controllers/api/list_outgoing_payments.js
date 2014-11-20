var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {

  api.listOutgoingPayments(function(err, payments){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ payments: payments });
    }
  });
  
};

