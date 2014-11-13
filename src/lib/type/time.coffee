###
  生成time数据(new Date().getTime())
  author: ec.huyinghuan@gmail.com
  date: 14.11.06
  $time(start, step)
  $time or $time() 当前时间
###
module.exports =  (exp)->
  type = 'time'
  orig = ["$time", "$time()"]
  return type: type if _.indexOf(orig, exp) isnt -1

  reg = /^\$time\(()\)$/

