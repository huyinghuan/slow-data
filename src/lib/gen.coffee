_RandExp = require 'randexp'
module.exports = (reg)->
  new _RandExp(reg).gen()
