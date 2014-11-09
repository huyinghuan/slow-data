_path = require 'path'
_SlowData = require '../lib/index'
_peopleSchema = require './shema/people'

#console.log _slowData.genObject _peopleSchema.module
options =
  templateAvailable: _path.join __dirname, 'modules'
_slowData = new _SlowData(false, options)

#_slowData.init()
console.log _slowData.genObject _peopleSchema.module