var api = require(__dirname+'/../../../api');

module.exports = function(req, res){

  api.getTrustLines(function(err, lines){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send({ lines: lines });
    }
  });

};
