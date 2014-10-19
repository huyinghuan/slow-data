_ = require 'lodash'
#−9007199254740992  and 9007199254740992 （即正负2的53次方）
exports.gen = (exp, options)->
  defOptions =
    fixed: 0 #保留几位小数
    min: -4294967296 # -Math.power(2, 32)
    max: 4294967296 # Math.power(2, 32)
  _.extend defOptions, options
  return undefined  if exp isnt 'number'
  value =  Math.random() * (defOptions.max - defOptions.min) + defOptions.min
  return value.toFixed(defOptions.fixed)