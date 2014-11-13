process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var RippleTransactions = require(__dirname+'/../../').data.models.rippleTransactions;
var RippleAddresses = require(__dirname+'/../../').data.models.rippleAddresses;
var Chance = require('chance');
var chance = new Chance();
var rippleLib= require('ripple-lib');

describe('RippleTransactions ', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    RippleTransactions.initModel(true).then(function() {
      done();
    });
  });

  it('should successfully persist a ripple_transaction record with chance generated data', function() {
    var stateMap = ['incoming', 'outgoing', 'failed', 'pending', 'completed'];
    var chanceToAmount = chance.floating({min: 1, fixed: 2}),
        chanceToCurrency = chance.currency().code,
        toIssuer = rippleLib.Wallet.generate().address,
        chanceFromAmount = chance.floating({min: 1, fixed: 2}),
        chanceFromCurrency = chance.currency().code,
        fromIssuer = rippleLib.Wallet.generate().address,
        chanceInvoiceId = chance.hash({length: 64, casing: 'upper'}),
        chanceDirection = chance.bool() ? 'to-ripple' : 'from-ripple',
        chanceState = stateMap[chance.integer({min: 0, max: 4})],
        toAddressId, fromAddressId;

    return RippleAddresses.findOrCreate({
      type: 'independent',
      managed: false,
      address: toIssuer
    }).then(function(address) {
      toAddressId = address.id;

      return RippleAddresses.findOrCreate({
        type: 'independent',
        managed: false,
        address: fromIssuer
      }).then(function(address) {
        fromAddressId = address.id;

        return RippleTransactions.create({
          to_address_id: toAddressId,
          from_address_id: fromAddressId,
          to_amount: chanceToAmount,
          to_currency: chanceToCurrency,
          to_issuer: toIssuer,
          from_amount: chanceFromAmount,
          from_currency: chanceFromCurrency,
          from_issuer: fromIssuer,
          invoice_id: chanceInvoiceId,
          direction: chanceDirection,
          state: chanceState
        }).then(function(transaction) {
          chai.assert.strictEqual(transaction.to_address_id, toAddressId);
          chai.assert.strictEqual(transaction.from_address_id, fromAddressId);
          chai.assert.strictEqual(transaction.to_amount, chanceToAmount);
          chai.assert.strictEqual(transaction.to_currency, chanceToCurrency);
          chai.assert.strictEqual(transaction.to_issuer, toIssuer);
          chai.assert.strictEqual(transaction.from_amount, chanceFromAmount);
          chai.assert.strictEqual(transaction.from_currency, chanceFromCurrency);
          chai.assert.strictEqual(transaction.from_issuer, fromIssuer);
          chai.assert.strictEqual(transaction.invoice_id, chanceInvoiceId);
          chai.assert.strictEqual(transaction.direction, chanceDirection);
          chai.assert.strictEqual(transaction.state, chanceState);
        }).error(function(error) {
          throw new Error(JSON.stringify(error));
        });
      }).error(function(error) {
        throw new Error(JSON.stringify(error));
      });
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    });
  });
});

