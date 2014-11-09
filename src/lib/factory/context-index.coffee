###
  上下文索引
  @author ec.huyinghuan@gmail.com
  @date 14-11.09
  @index
###
_ = require 'lodash'
module.exports = (options)->
  defOptions =
    action: '+'
    step: 0
  _.extend defOptions, options if options
  step = +defOptions.step
  step = 0 if isNaN(step)
  index = @index
  switch defOptions.action
    when '+'
      index = index + step
    when '-'
      index = index - step
    when '*'
      index = index * step
    when '/'
      index = index / step
  index = 0 if isNaN(index)
  return index

