const util              = require('util');
const EventEmitter      = require('events').EventEmitter;
const RippleRestClient  = require('ripple-rest-client');
const config            = require(__dirname+'/../config/environment');
const api               = require(__dirname+'/api.js');
const Promise           = require('bluebird');
const http              = require('superagent');

var rippleRestClient    = new RippleRestClient({
  api       : config.get('RIPPLE_REST_API'),
  account   : config.get('COLD_WALLET'),
  secret    : ''
});

function Poller () {}

Poller.prototype = {
  start: function(hash) {
    var _this = this;
    _this._poll(hash);
  },
  _poll: function(hash) {
    var _this = this;
    _this.lastHash = hash;
    _this._getNotification(hash)
      .then(function(notification){
        
        return _this._checkIfNotificationIsPayment(notification);
      })
      .then(function(hash){
        return _this._getPayment(hash);
      })
      .then(function(payment){
        return _this._broadcastPayment(payment);
      })
      .then(function(payment){
        return _this._updateLastPaymentHash(payment);
      })
      .then(function(updatedHash){
        setTimeout(function() {
          _this._poll(updatedHash);
        }, 500);
      })
      .catch(function(error){
        _this._handleError(error);
      });
  },
  _getNotification: function(hash) {
    return new Promise (function(resolve, reject) {
      rippleRestClient.getNotification(hash, function(error, notification) {
        if (error) { return reject(error); }
        resolve(notification);
      });
    });
  },
  _checkIfNotificationIsPayment: function(notification) {

    return new Promise (function(resolve, reject) {
      if (notification && notification.next_notification_url) {
        http(notification.next_notification_url)
        .end(function(error, response) {
          if (error) { return reject(error); }
          
          if (response.body.notification.type === 'payment') {
            resolve(response.body.notification.hash);
          } else {
            logger.warn('payment:non-payment-notification:error:', response.body.notification.hash);
            reject(new Error('NonPaymentHash'));
          }
        });
      } else {
        reject(new Error('NoNewPayment'));
      }
    });
  },
  _getPayment: function(hash) {
    return new Promise (function(resolve, reject) {
      if (hash) {
        rippleRestClient.getPayment(hash, function (error, payment) {
          if (error) {
            return reject(error);
          }
          console.log(payment);
          resolve(payment);
        });
      } else {
        reject(new Error('NoNewPayment'));
      }
    });
  },
  _broadcastPayment: function(payment) {
    vent.emit('payment', payment);
    return new Promise(function(resolve){
      resolve(payment);
    });
  },
  _updateLastPaymentHash: function(payment) {
    return new Promise (function(resolve, reject) {
      api.getColdWallet(function(error, address) {
        address.setLastPaymentHash(payment.hash).then(function(updatedData){
          var newHash = JSON.parse(updatedData.dataValues.data);
          resolve(newHash.lastPaymentHash);
        }).error(reject);
      });
    });
  },
  _fetchLastPaymentHash: function() {
    logger.info('re-fetching payment hash...');
    return new Promise (function(resolve, reject) {
      api.getColdWallet(function(error, address) {
        address.fetchLastPaymentHash()
          .then(function(hash) {
            return address.setLastPaymentHash(hash)
          })
          .then(function(updatedData) {
            var newHash = JSON.parse(updatedData.dataValues.data);
            resolve(newHash.lastPaymentHash);
          })
          .catch(reject);
      });
    });
  },
  _handleError: function(error) {
    var _this = this;

    if (error && error.message === 'NonPaymentHash') {
      _this._fetchLastPaymentHash()
        .then(function(hash){
          return _this._getPayment(hash)
        })
        .then(function(payment){
          setTimeout(function() {
            if (payment.hash !== _this.lastHash) {
              vent.emit('payment', payment);
              _this._poll(payment.hash);
            } else {
              _this._poll(_this.lastHash);
            }
          }, 500);
        });
    } else if (error && error.message === 'NoNewPayment'){
      setTimeout(function() {
        _this._poll(_this.lastHash);
      }, 500);
    } else if (error) {
      logger.debug('payment:notification:error', error);
      setTimeout(function() {
        _this._poll(_this.lastHash);
      }, 500);
    }
  }
};

var vent    = new EventEmitter();
var poller  = new Poller();

function Listener() {}
util.inherits(Listener, EventEmitter);
Listener.prototype.start = function(hash) {
  var listener = this;
  vent.on('payment', function(payment) {
    listener.onPayment(payment);
  });

  poller.start(hash);
};

module.exports = Listener;
