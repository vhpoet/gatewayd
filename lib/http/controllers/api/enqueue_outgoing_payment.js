var api = require(__dirname+'/../../../api');

function OutgoingRipplePaymentsController() {
  this.resource = '/payments/outgoing';
}

OutgoingRipplePaymentsController.prototype = {
  post: function(request, response) {
    api.enqueueOutgoingPayment(request.body)
      .then(function(payment) {
        response.send(200, {
            success: true,
            payment: payment.toJSON()
          }
        );
      })
      .error(function(error){
        response.send(500, {
            success: false,
            error: error
          }
        );
      });
  }
};

var controller = new OutgoingRipplePaymentsController;

module.exports = controller.post;
