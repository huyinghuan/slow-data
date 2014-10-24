_ = require 'lodash'
module.exports = (exp)->
  type = "date"
  orig = ["$date", "$date[]", "$date()"]
  return type: type if _.indexOf(orig, exp) isnt -1