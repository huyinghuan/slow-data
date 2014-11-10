slow-data
=========

根据数据配置生成模拟数据。用于前段开发时模拟数据接口

## 约定
1. 以 $ 开始的为单一的数据类型
2. 以 $$ 为组合数据类型 （多个$组合）
3. 以 @ 开始的为上下文属性
4. 以 @@ 开始的为 对上下文属性的进一步 操作

## 基本数据 Core

### String

$string(min, max, special, number, sensitive)

```
min: 最小长度 默认值 6
max: 最大长度 当max不存在时 min=max， min==max当时，产生固定长度的字符串
special: 是否允许特殊字符 如：#!@等 默认true
number: 是否包含数字 默认 ture
sensitive: [1 | 0]是否全部大写或小写 1 大写 ， 0 小写， 默认随机，不区分
```

### number

$number(min, max, fixed)

```
min: 最小值 default -Math.power(2, 32)
max: 最大值 default Math.power(2, 32)
fixed: 保留的小数位数 default 0
```

当只有min一个参数时， 则min为最大值。 即 $min(a)产生  [-Math.power(2, 32), a]之间的随机值

### common

### date

### time

