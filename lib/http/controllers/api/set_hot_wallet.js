var api = require(__dirname+'/../../../api');

module.exports = function(req, res){
  var address = req.body.address;
  var secret = req.body.secret;

  if (!(address && secret)){
    api.generateWallet(function(err, wallet){
      address = wallet.address;
      secret = wallet.secret;
    });
  }

  api.setHotWallet(address, secret, function(err, wallet){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ 'HOT_WALLET': wallet });
    }
  });

};
