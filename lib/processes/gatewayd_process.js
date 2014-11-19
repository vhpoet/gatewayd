var gatewayd = require(__dirname+'/../../');
var Promise = require('bluebird');

function GatewaydProcess(routine) {
  this.routine = routine;
}

GatewaydProcess.prototype.constructor = GatewaydProcess;

GatewaydProcess.prototype.start = function() {

  process.on('uncaughtException', function(error) {
    gatewayd.logger.error('Caught globally uncaught exception: ' + error);
  });

  Promise.onPossiblyUnhandledRejection(function(error) {
    gatewayd.logger.error('Caught possibly unhandled rejection: ' + error);
  });

  this.routine(gatewayd);
}

module.exports = GatewaydProcess;

