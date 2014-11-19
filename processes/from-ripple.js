const RippleAccountMonitor = require('ripple-account-monitor');
const Promise = require('bluebird');
var GatewaydProcess = require(__dirname+'/../lib/processes/gatewayd_process');

module.exports = function(gatewayd) {
  const logger = gatewayd.logger;
  const coldWallet = gatewayd.config.get('COLD_WALLET');

  const monitor = new RippleAccountMonitor({
    rippleRestUrl: gatewayd.config.get('RIPPLE_REST_API'),
    account: coldWallet,
    onTransaction: function(transaction, next) {
      logger.info(transaction);
    },
    onError: function(error) {
      console.log('RippleAccountMonitor::Error', error);
    }
  });

  gatewayd.api.getColdWallet(function(error, address) {
    var hash = address.getLastPaymentHash();

    if (!hash) {
      address.fetchLastPaymentHash().then(function(hash) {
        address.setLastPaymentHash(hash).then(function() {
          start(hash);
        });
      });
    } else {
      start(hash);
    }
  });

  function start(hash) {
    monitor.lastHash = hash; 
    monitor.start();
    logger.info('Monitoring Ripple for Incoming Payments to '+ coldWallet +'starting at '+monitor.lastHash);
  }

};

if (require.main === module) {
  var gatewaydProcess = new GatewaydProcess(module.exports);
  gatewaydProcess.start();
}

