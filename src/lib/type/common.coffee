_ = require 'lodash'
module.exports = (exp)->
  return undefined if not _.isRegExp exp
  type = 'common'
  return type: type, options: exp