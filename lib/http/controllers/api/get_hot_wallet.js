var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){

  var hotWallet = config.get('HOT_WALLET') || {};
  res.send({ 'HOT_WALLET': { address: hotWallet.address }});

};

