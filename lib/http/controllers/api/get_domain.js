var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){

  res.send({ DOMAIN: config.get('DOMAIN') });

};
