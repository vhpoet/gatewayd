var requireAll = require('require-all-to-camel');
var Sequelize = require('sequelize');
var users                 = require('./controllers/users');
var externalAccounts      = require('./controllers/external_accounts');
var externalTransactions  = require('./controllers/external_transactions');
var rippleAddresses       = require('./controllers/ripple_addresses');
var rippleTransactions    = require('./controllers/ripple_transactions');

var chainer = new Sequelize.Utils.QueryChainer();

var bind = function(controller, property) {
  exports[property] = {};
  controller(exports[property]);
};

bind(externalAccounts, 'externalAccounts');
bind(externalTransactions, 'externalTransactions');
bind(rippleAddresses, 'rippleAddresses');
bind(rippleTransactions, 'rippleTransactions');
bind(users, 'users');

var models = requireAll(__dirname+'/models');

models.rippleAddresses.hasMany(models.rippleTransactions, {
  as: 'Payments'
});

models.rippleTransactions.belongsTo(models.rippleAddresses, {
  as: 'ToAddress',
  foreignKey: 'to_address_id',
  foreignKeyConstraint: true
});

models.rippleTransactions.belongsTo(models.rippleAddresses, {
  as: 'FromAddress',
  foreignKey: 'from_address_id',
  foreignKeyConstraint: true
});

models.rippleAddresses.hasMany(models.rippleTransactions,  {
  as: 'PaymentsTo',
  foreignKey: 'to_address_id'
});

models.rippleAddresses.hasMany(models.rippleTransactions, {
  as: 'PaymentsFrom',
  foreignKey: 'from_address_id'
});

models.externalTransactions.belongsTo(models.externalAccounts, {
  as: 'ToAccount',
  foreignKey: 'destination_account_id',
  foreignKeyConstraint: true
});

models.externalTransactions.belongsTo(models.externalAccounts, {
  as: 'FromAccount',
  foreignKey: 'source_account_id',
  foreignKeyConstraint: true
});

models.externalAccounts.hasMany(models.externalTransactions,  {
  as: 'PaymentsTo',
  foreignKey: 'to_account_id'
});

models.rippleAddresses.hasMany(models.externalTransactions,  {
  as: 'PaymentsFrom',
  foreignKey: 'from_account_id'
});

models.sync = function(callback) {
  chainer.add(models.rippleTransactions.sync());
  chainer.add(models.rippleAddresses.sync());
  chainer.add(models.gatewayTransactions.sync());
  chainer.add(models.externalAccounts.sync());
  chainer.add(models.externalTransactions.sync());
  chainer.add(models.users.sync());
  chainer.add(models.bridges.sync());
  chainer.add(models.kycData.sync());
  chainer.run().then(function() {
    callback();
  }).error(function(error) {
    callback(error);
  });
};

exports.models = models; 

