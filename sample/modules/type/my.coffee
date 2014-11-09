#自定义 数据生产函数demo
module.exports = (exp)->
  type = 'my'
  reg = /^\$my\((.*)\)$/
  return undefined if not reg.test exp
  content = exp.replace reg, '$1'
  return type: type, options: content
