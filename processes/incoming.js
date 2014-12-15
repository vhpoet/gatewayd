var Promise = require('bluebird');
Error.stackTraceLimit = Infinity;

process.on('uncaughtException', function(err) {
  gatewayd.logger.error('Caught exception: ' + err);
});

Promise.onPossiblyUnhandledRejection(function(err) {
  gatewayd.logger.error('Caught exception: ' + err);
});

var gatewayd                = require(__dirname+'/../');
const RippleAccountMonitor  = require('ripple-account-monitor');
const IncomingPayment       = require(__dirname+'/../lib/core/incoming_payment.js');
const coldWallet            = gatewayd.config.get('COLD_WALLET');
const rippleRestBaseUrl     = gatewayd.config.get('RIPPLE_REST_API');

const monitor = new RippleAccountMonitor({
  rippleRestUrl: rippleRestBaseUrl,
  account: coldWallet,
  onTransaction: function(transaction, next) {
    gatewayd.api.setLastPaymentHash(transaction.hash)
      .then(function(hash){
        gatewayd.logger.info('payment:hash set to:', hash);
        next();
      })
      .error(function(error) {
        gatewayd.logger.error('payment:set last payment hash:error', error);
        next();
      });
  },
  onPayment: function(paymentNotification, next) {
    var incomingPayment = new IncomingPayment(paymentNotification);
    incomingPayment.processPayment()
      .then(function(processedPayment){
        gatewayd.logger.info('payment:incoming:recorded', JSON.stringify(processedPayment));
        next();
      })
      .error(function(error){
        console.log(error);
        gatewayd.logger.error('payment:incoming:error', error);
        next();
      });
  },
  onError: function(error) {
    gatewayd.logger.error('RippleAccountMonitor::Error', error);
  }
});

gatewayd.api.getOrFetchLastPaymentHash()
  .then(function(paymentHash){
    monitor.lastHash = paymentHash;
    monitor.start();
    logger.info('Listening for incoming ripple payments from Ripple REST, starting at', monitor.lastHash);
  });
