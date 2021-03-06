###
  无需格式化的数据类型 $(hello)
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
###

_utils = require '../utils'

module.exports = (exp)->
  reg = /^\$\((.*)\)$/
  return undefined if not reg.test exp
  type = _utils.getFileName __filename
  content = exp.replace(reg, "$1")
  return type: type, options: content