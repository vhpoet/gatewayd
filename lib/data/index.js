require('./logs.js');
var requireAll = require('require-all-to-camel');
var api = {}

require(__dirname+'./users_controller.js')(api);

api.models = requireAll(__dirname+'/../../app/models/')

module.exports = api;

