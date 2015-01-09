###
  $date(start, step, format)
  生成日期数据
  author: ec.huyinghuan@gmail.com
  date: 14-11.06
###
_ = require 'lodash'
_utils = require '../utils'

module.exports = (exp)->
  type = "date"
  orig = ["$date", "$date()"]
  return type: type if _.indexOf(orig, exp) isnt -1
  reg = /^\$date\((.+)\)$/
  return undefined if not reg.test exp
  args = _utils.parseArguments exp.replace(reg, '$1')
  return undefined if not args

  options = {}

  options.start = args[0] if args[0] isnt ''
  options.step = args[1] if args[1] isnt ''
  options.format = args[2] if args[2] isnt ''

  type: type
  options: options
