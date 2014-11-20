var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){

  config.set('DATABASE_URL', req.body.database_url);
  res.send({ 'DATABASE_URL': config.get('DATABASE_URL') });

};
