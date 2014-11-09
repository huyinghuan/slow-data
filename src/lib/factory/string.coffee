_ = require 'lodash'
_gen = require '../gen'
module.exports = (options)->
  def =
    min: 6
    max: 12
    special: false  #允许特殊字符？
    number: false #允许数字？
    sensitive: false #是否全部为大或小写 upper #全部大写 lower: false #全部小写

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
  reg = new RegExp reg
  value = _gen reg

  return value.toUpperCase() if def.sensitive is 1
  return value.toLowerCase() if def.sensitive if 0
  return value