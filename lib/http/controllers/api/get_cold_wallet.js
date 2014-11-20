var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){

  var coldWallet = config.get('COLD_WALLET') || {};
  res.send({ 'COLD_WALLET': { address: coldWallet }});

};
