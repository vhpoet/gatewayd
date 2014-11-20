var api = require(__dirname+'/../../../api');

module.exports = function(req, res){

  api.listIncomingPayments(function(err, payments){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ incoming_payments: payments });
    }
  });
  
};

