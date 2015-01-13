###
  获取上下文的索引
  @author ec.huyinghuan@gmail.com
  @date 14-11.09
  @index
###
_ = require 'lodash'
module.exports = (exp)->
  type = "array-index"
  orig = ["@@index", "@@index()"]
  return type: type if _.indexOf(orig, exp) isnt -1
  reg = /^\@\@index\(([\+\*-\/]),\s*(\d+)\)$/
  return undefined if not reg.test exp
  content = exp.replace reg, '$1,$2'
  content = content.split(',')
  result =
    type: type
    options:
      action: content[0]
      step: content[1]
  return result