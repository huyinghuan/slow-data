module.exports =
  module:
    name: /[(a-z)]{4,5}/
    age: "$number(1,20)"
    address: "$string(6)"
    undef: "$sdasdasd"
    generic: "$($asdasd)"
    regexp: "$regexp([(a-z)]{4,5})"
    mydefined: "$my(123)"
    mix: '$$("$string", "_","$number(1, 5)", "-", "@index")'
    index: '@index'
    indexMix: '@@index(*, 2)'
  length: 2 #[1, 100] #数量