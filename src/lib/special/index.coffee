_utils = require '../utils'

queue = [/^\$\$\((.*)\)$/]

exports.isSpecial = (exp)->
  return true for reg in queue when reg.test exp
  return false

#获取混合对象组合
exports.getTemplateGroup = (exp)->
  reg = /^\$\$\((.*)\)$/
  arrStr = exp.replace(reg, "$1")
  return JSON.parse "[#{arrStr}]"