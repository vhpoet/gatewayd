var api = require(__dirname+'/../../../api');

module.exports = function(req, res) {

  api.listUserExternalAccounts(req.params.id, function(err, accounts){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ external_accounts: accounts });
    }
  });
  
};

