(function() {
  var _sload;

  _sload = require('sload');

  _sload.scan('.', __dirname, {
    ignore: function(filename) {
      if (filename.indexOf('base') !== -1) {
        return true;
      }
      if (filename.indexOf('test-all') !== -1) {
        return true;
      }
    }
  });

}).call(this);
