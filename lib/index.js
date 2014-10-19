(function() {
  var SlowData, _http;

  _http = require('http');

  SlowData = (function() {
    function SlowData() {}

    SlowData.prototype.init = function(routerConfig, schemaDirectory) {};

    SlowData.prototype.start = function(port) {};

    return SlowData;

  })();

  module.exports = new SlowData();

}).call(this);
