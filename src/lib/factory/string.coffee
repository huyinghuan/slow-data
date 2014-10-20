_ = require 'lodash'
_gen = require '../gen'
module.exports = (options)->
  def =
    min: 6
    max: 12
    special: false  #允许特殊字符？
    number: false #允许数字？
    upper: false #全部大写？
    lower: false #全部写

  _.extend def, options

  limit = "{#{def.min},#{def.max}}"
  exp = ""
  if def.special
    exp = "[A-z]"
  else
    exp = "[a-z]|[A-Z]"

  if def.number
    exp = "#{exp}|[0-9]"

  reg = ["(", exp, ")", limit].join("")
  value = _gen reg

  return value.toUpperCase() if def.upper
  return value.toLowerCase() if def.lower
