var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){
  var coldWallet = config.get('COLD_WALLET');
  if (coldWallet) {
    res.end(304);
  } else {
    config.set('COLD_WALLET', req.body.address);
    res.send(201, { 'COLD_WALLET':
      config.get('COLD_WALLET')
    });
  }

};
