
/*
  日期模拟数据
  @author ec.huyinghuan@gmail.com
  @date  2014.11.12
  start, step, format
 */

(function() {
  var _, _moment;

  _ = require('lodash');

  _moment = require('moment');

  module.exports = function(options, arrayContent) {
    var date, defOptions, exp, format, i, index, len, num, step, stepArr, unit;
    format = 'YYYY-MM-DD HH:mm:ss';
    defOptions = {
      start: _moment().format(format),
      step: Math.floor(false / "7d-2m1d"),
      format: format
    };
    _.extend(defOptions, options);
    date = _moment(defOptions.start, defOptions.format);
    step = defOptions.step;
    if (!step) {
      return date.toDate();
    }
    index = this['@index'] || 0;
    stepArr = [];
    stepArr = step.match(/(-?\d+[a-zA-Z]+)/g);
    for (i = 0, len = stepArr.length; i < len; i++) {
      exp = stepArr[i];
      num = parseInt(exp.replace(/(-?\d+)[a-zA-Z]+/, '$1'));
      unit = exp.replace(/-?\d+([a-zA-Z]+)/, '$1');
      date = date.subtract(num * index, unit);
    }
    return date;
  };

}).call(this);
