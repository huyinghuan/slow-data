slow-data
=========

根据数据配置生成模拟数据。用于前端开发时模拟数据接口

## 安装
```
npm install slow-data --save
```

## 快速开始

```
var _SlowData = require('slow-data')
var slow = new _SlowData()
//随机生成一个字符串，具体规则见下文。
console.log( slow.gen("$string") )
console.log( slow.gen("$number") )

var obj = {
  name: "$string(6, 12)"
  age: "$number(1,100)"
}
//生成一个对象， 其中name为6到12字符的字符串， age为0到100的随机整数
console.log( slow.genObject(obj) )

```

## API

如果API解释不清楚，可以对照下面的实例进行理解。
### class SlowData

### 构造函数 

SlowData(schemaDirectory, options)

	@schemaDirectory
 
	 String，可选参数。 数据模板module所在的文件夹（绝对路径）.

	@options

	  Object, 可选参数。 数据模板的一些配置。

	其中：
		options.templateEnable
		    Object, 可选参数。配置 启动哪些数据生产函数。默认情况下，启用所有。
    
		options.templateAvailable
		    Array<String> 或 String。 可选参数。 主要配置自定义的模板生产函数所在的文件夹
  
### 成员函数

#### setOptions(options)

	options 同 构造函数里面的options。用于配置SlowData

#### gen(expression, context)  （核心）

	根据模拟数据的表达式 生成相关模拟数据。

	@expression.
		模拟数据的表达式。具体见下文 基本模拟数据类型。
		Regexp 或 String 必选参数
		根据定义的正则表示式 或者 基本模拟数据类型的字符串 生产相关随机数据。

	@context.
		产生模拟数据时的上下文。
		Object  可选参数
  

#### genObject(bean, context) (核心)

	基于对 gen 的封装， 生产相关模拟数据对象。
	@bean
		包含模拟数据表达式的对象。Object 必选参数
	@context. 
		生产模拟数据时的上下文环境。 可选

#### build(schema, context) (核心)

	基于对 genObject 的封装。 生成一组模拟数据。

	@schema。 模拟数据数组的相关内容设置。
	  Object 或 string。 必选。包含规定字段格式的object对象 或者对象的名字。

	@context. 生产模拟数据时的上下文环境。 可选

## 实例

### 对gen的应用

### 对genObject的应用

### 对build的应用


## 基本模拟数据类型

### 约定
1. 以 $ 开始的为单一的数据类型
2. 以 $$ 为组合数据类型 （多个单一的数据类型组合）
3. 以 @ 开始的为上下文属性
4. 以 @@ 开始的为 对上下文属性的进一步 操作



### String

$string(min, max, special, number, sensitive)

```
min: 最小长度 默认值 6
max: 最大长度 当max不存在时 min=max， min==max当时，产生固定长度的字符串
special: 是否允许特殊字符 如：#!@等 默认true
number: 是否包含数字 默认 ture
sensitive: [1 | 0]是否全部大写或小写 1 大写 ， 0 小写， 默认随机，不区分
```

例如：
```
slowData = new SlowData()
slowData.gen('$string(5)')
slowData.gen('$string(4, 10)')
slowData.gen('$string(5, 5, false, 1)')
```

### number

$number(min, max, fixed)

```
min: 最小值 default -Math.power(2, 32)
max: 最大值 default Math.power(2, 32)
fixed: 保留的小数位数 default 0
```

当只有min一个参数时， 则min为最大值。 即 $number(a)产生  [-Math.power(2, 32), a]之间的随机值

例如：
```
slowData.gen('$number(10)')
slowData.gen('$number(0, 20)')
slowData.gen('$number(0, 20, 2)')
```

### common(reg)
reg: 正则表达式

```
slowData.gen('$common(/([a-z]|[A-Z]){3,7}/)')
```

###regexp(reg)
regStr: 正则表达式字符串 ，注意区别于```common(reg)```  common的reg是一个RegExp对象。这里的是个字符串

```
slowData.gen("$regexp([(a-z)]{4,5})"）
```

### date


|Key    | Shorthand|
|------ | --------|
|years  | y|
|months | M|
|weeks  | w|
|days   | d|
|hours  | h|
|minutes| m|
|seconds| s|
|milliseconds | ms|


### time

## 参考正则表达式

  匹配中文字符的正则表达式： [\u4e00-\u9fa5]
  
  匹配双字节字符(包括汉字在内)：[^\x00-\xff]
  评注：可以用来计算字符串的长度（一个双字节字符长度计2，ASCII字符计1）
  
  匹配空白行的正则表达式：\n\s*\r
  
  匹配Email地址的正则表达式：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
  
  匹配网址URL的正则表达式：[a-zA-z]+://[^\s]*
  评注：网上流传的版本功能很有限，上面这个基本可以满足需求
  
  匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
  
  匹配国内电话号码：\d{3}-\d{8}|\d{4}-\d{7}
  评注：匹配形式如 0511-4405222 或 021-87888822
  
  匹配腾讯QQ号：[1-9][0-9]{4,}
  评注：腾讯QQ号从10000开始
  
  匹配中国邮政编码：[1-9]\d{5}(?!\d)
  评注：中国邮政编码为6位数字
  
  匹配身份证：\d{15}|\d{18}
  评注：中国的身份证为15位或18位
  
  匹配ip地址：\d+\.\d+\.\d+\.\d+
  评注：提取ip地址时有用
  
  匹配特定数字：
  ^[1-9]\d*$ //匹配正整数
  ^-[1-9]\d*$  //匹配负整数
  ^-?[1-9]\d*$  //匹配整数
  ^[1-9]\d*|0$  //匹配非负整数（正整数 + 0）
  ^-[1-9]\d*|0$ //匹配非正整数（负整数 + 0）
  ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ //匹配正浮点数
  ^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ //匹配负浮点数
  ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$  //匹配浮点数
  ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$  //匹配非负浮点数（正浮点数 + 0）
  ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$ //匹配非正浮点数（负浮点数 + 0）
  评注：处理大量数据时有用，具体应用时注意修正
  
  匹配特定字符串：
  ^[A-Za-z]+$ //匹配由26个英文字母组成的字符串
  ^[A-Z]+$ //匹配由26个英文字母的大写组成的字符串
  ^[a-z]+$ //匹配由26个英文字母的小写组成的字符串
  ^[A-Za-z0-9]+$ //匹配由数字和26个英文字母组成的字符串
  ^\w+$ //匹配由数字、26个英文字母或者下划线组成的字符串