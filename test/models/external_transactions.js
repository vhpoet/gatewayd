process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var fixtures = require(__dirname+'/../fixtures/transactions');
var ExternalTransactions = gatewayd.models.externalTransactions;

var fixExtXaction = fixtures.externalTransaction;
var fixMinXaction = fixtures.minimalExternalTransaction;

describe('external_transactions model', function() {
  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully persist a external_transaction record', function() {
    return ExternalTransactions.create(fixExtXaction).then(function(transaction) {
      return ExternalTransactions.find(transaction.id);
    }).then(function(transaction) {
      chai.assert.strictEqual(transaction.external_account_id, fixExtXaction.external_account_id);
      chai.assert.strictEqual(transaction.source_amount, fixExtXaction.source_amount);
      chai.assert.strictEqual(transaction.source_currency, fixExtXaction.source_currency);
      chai.assert.strictEqual(transaction.source_account_id, fixExtXaction.source_account_id);
      chai.assert.strictEqual(transaction.destination_amount, fixExtXaction.destination_amount);
      chai.assert.strictEqual(transaction.destination_currency, fixExtXaction.destination_currency);
      chai.assert.strictEqual(transaction.destination_account_id, fixExtXaction.destination_account_id);
      chai.assert.strictEqual(transaction.amount, fixExtXaction.amount);
      chai.assert.strictEqual(transaction.currency, fixExtXaction.currency);
      chai.assert.strictEqual(transaction.invoice_id, fixExtXaction.invoice_id);
      chai.assert.strictEqual(transaction.memos, fixExtXaction.memos);
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    });
  });

  it('should successfully persist if amount and currency are missing', function() {
    return ExternalTransactions.create(fixMinXaction).then(function(transaction) {
      return ExternalTransactions.find(transaction.id);
    }).then(function(transaction) {
      chai.assert.strictEqual(transaction.external_account_id, fixMinXaction.external_account_id);
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    });
  });

});

