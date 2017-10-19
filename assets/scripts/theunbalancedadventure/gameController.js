'use strict'

const api = require('./api')
const ui = require('./ui')

let currentAdventurer
let currentEnemy

const startGame = function (advInfo) {
  // load in adv info where needed
  // check for previous match
  // load match in
  // if no match, start a new one (or if load fails)
  currentAdventurer = advInfo
  newEncounter()
}

const newEncounter = function () {
  api.viewEnemies()
    .then((enemies) => {
      enemies = enemies.enemies
      currentEnemy = enemies[Math.floor(Math.random() * enemies.length)]
    })
    .then(() => {
      ui.updateEncounter(currentEnemy)
    })
}

module.exports = {
  startGame
}
