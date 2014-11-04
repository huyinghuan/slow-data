###
  无需格式化的数据类型 $(hello)
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
###

_utils = require '../utils'

module.exports = (exp)->
  type = _utils.getFileName __filename
  reg = /^\$\((.*)\)$/
  return undefined if not reg.test exp
  arr = exp.match(reg)
  return undefined  if arr.length < 2
  content = arr[1]
  return type: type, options: content