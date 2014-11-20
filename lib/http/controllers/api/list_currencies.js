var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){
  res.send({ 'CURRENCIES': config.get('CURRENCIES') });
};

