
module.exports = function(gatewayd) {
  gatewayd.processes.add('outgoing');
  gatewayd.processes.add('incoming');
  gatewayd.processes.add('deposits');
  gatewayd.processes.add('withdrawals');

  if (gatewayd.config.get('HTTP_SERVER')) {
    gatewayd.processes.add('server');
  }
  if (gatewayd.config.get('RIPPLE_REST_PATH')) {
    gatewayd.processes.add('ripple_rest');
  }
}

