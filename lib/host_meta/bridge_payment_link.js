const Link = require(__dirname + '/link.js');

function BridgePaymentLink(options) {
  Link.call(this, {
    rel: 'https://gatewayd.org/gateway-services/bridge_payments',
    template: 'https://' + options.gatewayd.config.get('DOMAIN') + '/v' + options.gatewayd.config.get('VERSION') + '/bridge_payments'
  });
  this.properties.version = options.gatewayd.config.get('VERSION');
}

BridgePaymentLink.prototype = Object.create(Link.prototype);
BridgePaymentLink.prototype.constructor = BridgePaymentLink;

BridgePaymentLink.prototype.setSenderClaims = function setSenderClaims(senderClaims) {
  var _this = this;
  if (!_this.properties.fields) {
    _this.properties.fields = {};
  }
  _this.properties.fields.sender_claims = senderClaims;
};

module.exports = BridgePaymentLink;