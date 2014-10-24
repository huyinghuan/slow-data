_moment = require 'moment'
module.exports = (options)->
  def =
    now: true #当前时间
    min: "1970-1-1"
    max: _moment().format('YYYY-MM-DD')