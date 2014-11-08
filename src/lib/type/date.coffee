###
  $date(start, end, step, format)
  生成日期数据
  author: ec.huyinghuan@gmail.com
  date: 14-11.06
###
_ = require 'lodash'
module.exports = (exp)->
  type = "date"
  orig = ["$date", "$date()"]
  return type: type if _.indexOf(orig, exp) isnt -1
