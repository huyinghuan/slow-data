module.exports =
  module:
    name: /[(a-z)]{4,5}/
    age: "$number[1,20]"
    address: "$string[6]"
  number: 100, #[1, 100] #数量