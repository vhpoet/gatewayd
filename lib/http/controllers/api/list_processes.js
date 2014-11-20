var api = require(__dirname+'/../../../api');

module.exports = function(req, res){
  api.listProcesses({ json: true },function(err, resp){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send(resp);
    }
  });
};
