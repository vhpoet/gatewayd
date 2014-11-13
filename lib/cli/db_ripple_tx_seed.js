var RippleTransactions = require(__dirname+'/../../').data.models.rippleTransactions;
var RippleAddresses = require(__dirname+'/../../').data.models.rippleAddresses;
var Chance = require('chance');
var chance = new Chance();
var rippleLib= require('ripple-lib');

/**
* seed db transactions
*
* @param {int} how_many
*/

function dbRippleTxSeed(howMany) {
  var i = howMany || 1,
      toAddressId, fromAddressId, toIssuer, fromIssuer;
  while (i) {

    toIssuer = rippleLib.Wallet.generate().address;
    fromIssuer = rippleLib.Wallet.generate().address;

    RippleAddresses.findOrCreate({
      type: 'independent',
      managed: false,
      address: toIssuer
    }).then(function(address) {
      toAddressId = address.id;

      RippleAddresses.findOrCreate({
        type: 'independent',
        managed: false,
        address: fromIssuer
      }).then(function(address) {
        fromAddressId = address.id;

        var direction = chance.bool() ? 'to-ripple' : 'from-ripple';
        var stateMap = ['incoming', 'outgoing', 'failed', 'pending', 'completed'];

        RippleTransactions.create({
          to_address_id: toAddressId,
          from_address_id: fromAddressId,
          to_amount: chance.floating({min: 1, fixed: 2}),
          to_currency: chance.currency().code,
          to_issuer: toIssuer,
          from_amount: chance.floating({min: 1, fixed: 2}),
          from_currency: chance.currency().code,
          from_issuer: fromIssuer,
          invoice_id: chance.hash({length: 64, casing: 'upper'}),
          direction: direction,
          state: stateMap[chance.integer({min: 0, max: 4})]
        }).then(function() {
          console.log('successfully created transaction record');
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
      });
    });

    i--;
  }
}

module.exports = dbRippleTxSeed;
