'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

const events = require('./theunbalancedadventure/events')

$(() => {
  events.registerHandlers()
})
