const ProcessManager = require(__dirname+'/../processes/process_manager.js');
const Pm2ProcessManager = require(__dirname+'/../processes/pm2_process_manager.js');
var features = require(__dirname+'/../features');

/**
 * @function startGateway
 * @requires GatewayProcessManager
 * @description Starts gateway processes.
 * @param opts
 */

function startGateway() {
  var processManager;

  if (features.isEnabled('singleProcess') {
    processManager = new ProcessManager();
  } else {
    processManager = new Pm2ProcessManager();
  }

  processManager.start();
}

module.exports = startGateway;

