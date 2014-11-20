var config = require(__dirname+'/../../../../config/environment');

/*
* @requires Config
* @function setDomain
* @description Set the domain via http for use in the
* ripple.txt file and also as the email address for
* admin basic authentication. 
* @param {String} domain
*/

module.exports = function(req, res){

  config.set('DOMAIN', req.body.domain);
  config.save(function(){
    res.send({ 'DOMAIN': config.get('DOMAIN') });
  });

};
