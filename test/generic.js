(function() {
  var Base, entity, queue;

  Base = require('./base');

  entity = new Base('generic');

  queue = ["$(123)", '$(sta)'];

  entity.testAll(queue);

}).call(this);
