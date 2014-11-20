var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){
  res.send({ 'RIPPLE_REST_API': config.get('RIPPLE_REST_API') });
};
