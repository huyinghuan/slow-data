_ = require 'lodash'
module.exports = (exp)->
  return undefined if not _.isRegExp exp
  return type: 'common', options: exp