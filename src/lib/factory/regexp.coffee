_ = require 'lodash'
_Randexp = require 'randexp'
#生成符合正则表达式的数据
module.exports = (exp, options)->
  return undefined  if not _.isRegExp exp
  return new _Randexp().gen(exp)
