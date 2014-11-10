###
  生成上下文数据
  @author ec.huyinghuan@gmail.com
  @date 2014/11/10
###

module.exports = (exp)->
  type = 'context'

  reg = /^\@([^@].*)$/

  return undefined if reg.test exp

  content = exp.replace reg, '$1'

  type: type, options: content
