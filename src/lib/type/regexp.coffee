###
  正则表达式 $regexp(/[a-z]/)
  author: ec.huyinghuan@gmail.com
  date: 14.11.05
###
_utils = require '../utils'

module.exports = (exp)->
  reg = /\$regexp\((.*)\)$/
  return undefined if not reg.test exp
  type = _utils.getFileName __filename
  content = exp.replace reg, "$1"
  type: type, options: new RegExp(content)
