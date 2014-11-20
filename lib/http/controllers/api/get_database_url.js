var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){
  res.send({
    DATABASE_URL: config.get('DATABASE_URL')
  });
};
