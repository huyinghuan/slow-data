_path = require 'path'
_SlowData = require '../lib/index'
_peopleSchema = require './schema/people'

#console.log _slowData.genObject _peopleSchema.module
options =
  templateAvailable: _path.join __dirname, 'modules'

schemaPath = _path.join __dirname, 'schema'

_slowData = new _SlowData(schemaPath, options)

#console.log _slowData.build 'people'
#console.log _slowData.build _peopleSchema
#_slowData.init()
#console.log _slowData.genObject _peopleSchema.module

#for index in [0..1]
#  console.log _slowData.genObject _peopleSchema.module, {index: index}