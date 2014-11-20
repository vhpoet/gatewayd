var api = require(__dirname+'/../../../api');

module.exports = function(req, res){
  var currency = req.body.currency;
  var amount = req.body.amount;

  api.setTrustLine(currency, amount, function(err, resp){
    if (err){
      res.send({ error: err });
    } else {
      res.send({ lines: resp });
    }
  });
};


