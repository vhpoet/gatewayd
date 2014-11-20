var api = require(__dirname+'/../../../api');

module.exports = function(req, res){
  api.generateWallet(function(err, wallet){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ wallet: wallet });
    }
  });


};
