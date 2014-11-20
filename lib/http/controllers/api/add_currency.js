var api = require(__dirname+'/../../../api');

module.exports = function(req, res){

  api.addCurrency(req.body.currency, function(err, currencies){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send({ currencies: currencies });
    }
  });
};
