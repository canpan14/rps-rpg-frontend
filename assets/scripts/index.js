'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

const events = require('./rpsrpg/events')
const ui = require('./rpsrpg/ui')

$(() => {
  events.registerHandlers()
  ui.registerHandlers()
})
