Base = require './base'

entity = new Base('regexp')

queue = ["$regexp([a-z])", '$regexp(a\\s{3}s)']

entity.testAll(queue)