var api = require(__dirname+'/../../../api');

module.exports = function(request, response) {
  api.clearWithdrawal(request.params.id, function(error, withdrawal){
    if (error) {
      if (error.id === 'record not found'){
        response.send(404, {
          error: {
            field: 'id',
            message: 'not found'
          }
        });
      } else {
        response.send(500, {
          error: error
        });
      }
    } else {
      response.send(200, {
        withdrawal: withdrawal
      });
    }
  });
};

