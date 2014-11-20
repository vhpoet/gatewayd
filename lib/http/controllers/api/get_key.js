var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){
  res.send({ 'KEY': config.get('KEY') });
};
