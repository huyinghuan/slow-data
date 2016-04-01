(function() {
  var _SlowData, _path, _peopleSchema, _slowData, options, schemaPath;

  _path = require('path');

  _SlowData = require('../lib/index');

  _peopleSchema = require('./schema/people');

  options = {
    templateAvailable: _path.join(__dirname, 'modules')
  };

  schemaPath = _path.join(__dirname, 'schema');

  _slowData = new _SlowData(schemaPath, options);

  console.log(_slowData.build('people'));

  console.log(_slowData.build(_peopleSchema));

  console.log(_slowData.genObject(_peopleSchema.module));

}).call(this);
