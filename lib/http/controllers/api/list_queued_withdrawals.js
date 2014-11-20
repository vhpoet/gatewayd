var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {

  api.listQueuedWithdrawals(function(err, withdrawals){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ withdrawals: withdrawals });
    }
  });
  
};

