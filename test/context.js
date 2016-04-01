(function() {
  var Base, entity, queue;

  Base = require('./base');

  entity = new Base('context');

  queue = ['@name', '@age', '@address'];

  entity.testAll(queue, {
    name: "abc",
    age: 123,
    address: "hello world"
  });

}).call(this);
