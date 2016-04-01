(function() {
  var Base, entity, queue;

  Base = require('./base');

  entity = new Base('common');

  queue = [/[(a-z)]{4,5}/, /[(a-zA-Z)]{8}/];

  entity.testAll(queue);

}).call(this);
