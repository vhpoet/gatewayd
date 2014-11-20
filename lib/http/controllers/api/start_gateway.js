var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {
  var processes = req.body.processes;
  try {
    api.startGateway(processes);
    res.send({ processes: processes });
  } catch (err){
    res.send(500, {error: err});
  }
};

