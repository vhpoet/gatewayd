const Link = require(__dirname + '/link.js');

function BridgePaymentStatusLink(options) {
  Link.call(this, {
    rel: 'https://gatewayd.org/gateway-services/bridge_payment_status',
    template: 'https://' + options.gatewayd.config.get('DOMAIN') + '/v' + options.gatewayd.config.get('VERSION') + '/bridge_payments/{id}'
  });
  this.properties.version = options.gatewayd.config.get('VERSION');
}

BridgePaymentStatusLink.prototype = Object.create(Link.prototype);
BridgePaymentStatusLink.prototype.constructor = BridgePaymentStatusLink;

module.exports = BridgePaymentStatusLink;