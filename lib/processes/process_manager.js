const requireAll = require('require-all');
var gatewayd = require(__dirname+'/../../');

var processSet = require(__dirname+'/index.js');
var processes = requireAll(__dirname+'/../../processes/');

function ProcessManager() {
  this.processSet = processSet;
}

ProcessManager.prototype = {
  constructor: ProcessManager,

  start: function() {
    this.processSet.toArray().forEach(function(path) {
      processes[path](gatewayd);
    });
  }
}

module.exports = ProcessManager;

