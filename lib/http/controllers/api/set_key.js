var config = require(__dirname+'/../../../../config/environment');

module.exports = function(req, res){
  config.set('KEY', req.body.key);
  config.save(function(error){
    if(error){
      res.send(500, {
        success: true,
        error: error
      });
    } else {
      res.send({
        success: true,
        KEY: config.get('KEY')
      });
    }
  });

};
