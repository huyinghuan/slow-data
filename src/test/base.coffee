require 'colors'
class TestBase
  constructor: (@typeStr)->
    @init()

  init: ->
    @type = require "./../lib/type/#{@typeStr}"
    @factory = require "./../lib/factory/#{@typeStr}"

  testType: (queue)->
   for index in queue
     console.log @type(index)

  testFactory: (option)->
    @factory(options) for i in [0..10]

  testAll: (queue)->
    for index in queue
      typeObj =  @type(index)
      if typeObj
        console.log "express: #{index}, passed \n
             options: #{JSON.stringify(typeObj)},\n
             result: #{@factory typeObj.options}".green
      else
        console.log "express: #{index}  cann't resolve!".red


  getType: -> @type

  getFactory: -> @factory

module.exports = TestBase