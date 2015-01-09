_sload = require 'sload'

_sload.scan('.', __dirname, {
  ignore: (filename)->
    return true if filename.indexOf('base') isnt -1
    return true if filename.indexOf('test-all') isnt -1
})