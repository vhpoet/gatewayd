process.env.config = __dirname+'/config/config.json';
const RipplePlugin = require('gatewayd-ripple-plugin');

module.exports = function(gatewayd) {
  var plugin = new RipplePlugin();

  gatewayd.processes.add('./node_modules/gatewayd-ripple-plugin/processes/outgoing.js');
  gatewayd.processes.add('./node_modules/gatewayd-ripple-plugin/processes/outgoing.js');
  gatewayd.server.use('/ripple-simple', plugin.router);


  plugin.remote.connect();
}

