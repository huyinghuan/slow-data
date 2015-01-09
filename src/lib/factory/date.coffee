###
  日期模拟数据
  @author ec.huyinghuan@gmail.com
  @date  2014.11.12
  start, step, format
###
_ = require 'lodash'
_moment = require 'moment'
module.exports = (options)->
  format = 'YYYY-MM-DD HH:mm:ss'
  defOptions =
    start: _moment().format(format)
    step: false  //"7d-2m1d"
    format: format

  _.extend defOptions, options
  date = _moment(defOptions.start, defOptions.format)
  #step仅用在step
  step = defOptions.step
  return date.toDate() if not step
  index = @['index'] or 0
  stepArr = []
  stepArr = step.match /(-?\d+[a-zA-Z]+)/g

  for exp in stepArr
    num = parseInt(exp.replace(/(-?\d+)[a-zA-Z]+/, '$1'))
    unit = exp.replace /-?\d+([a-zA-Z]+)/, '$1'
    date = date.subtract num * index, unit

  return date
