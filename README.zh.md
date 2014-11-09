slow-data
=========

根据数据配置生成模拟数据。用于前段开发时模拟数据接口

## 基本数据

### String

$string(min, max, special, number, upper, lower)

min: 最小长度 默认值 6
max: 最大长度 默认值 12 min=max时，产生固定长度的字符串
special: 是否允许特殊字符 如：#!@等 默认true
number: 是否包含数字 默认 ture
sensitive: [upper | lower]是否全部大写或小写 upper 大写 ， lower小写， 默认随机，不区分
