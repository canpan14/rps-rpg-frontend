'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

const events = require('./rpsrpg/events')

$(() => {
  $('[data-toggle="tooltip"]').tooltip()
  events.registerHandlers()
})
