'use strict'

const api = require('./api')
const ui = require('./ui')
const Enemy = require('./enemy')
const Adventurer = require('./adventurer')

let currentAdventurer
let currentEnemy
let roundResultText
let fightOver = true

const startGame = function (advInfo) {
  // load in adv info where needed
  // check for previous match
  // load match in
  // if no match, start a new one (or if load fails)
  currentAdventurer = Adventurer.createAdventurer(advInfo.adventurer)
  ui.updateAdventurerInfo(currentAdventurer)
  newEncounter()
}

const newEncounter = function () {
  fightOver = false
  ui.updateEndRoundMessage('')

  api.viewEnemies()
    .then((enemies) => {
      enemies = enemies.enemies
      currentEnemy = Enemy.createEnemy(enemies[Math.floor(Math.random() * enemies.length)])
    })
    .then(() => {
      ui.updateEncounter(currentEnemy)
    })
}

const playerAction = function (moveChoice) {
  // Player chooses action
  // Enemy chooses action
  // Update player choice stats (future)
  // Resolve depending on result
  // End encounter/kill player if player/enemy health hits 0 or below
  if (fightOver) {
    return
  }

  const enemyChoice = enemyAction()
  switch (roundResult(moveChoice, enemyChoice)) {
    case 'player':
      playerWinsRound()
      break
    case 'enemy':
      enemyWinsRound()
      break
    case 'draw':
      drawRound()
      break
  }
  if (currentEnemy.health <= 0) {
    fightOver = true
    ui.updateEndRoundMessage('The ' + currentEnemy.name + ' has been slain.')
  } else if (currentAdventurer.health <= 0) {
    fightOver = true
    ui.updateEndRoundMessage('You have died.')
  }
}

const enemyAction = function () {
  const actionToTake = weightedRandomAttack({'rock': currentEnemy.rock_chance,
    'paper': currentEnemy.paper_chance,
    'scissor': currentEnemy.scissor_chance})
  return actionToTake
}

const roundResult = function (playerMove, enemyMove) {
  roundResultText = 'Both sides used ' + playerMove + ' and it was a stalemate.'
  if (playerMove === enemyMove) return 'draw'
  roundResultText = 'The enemy dodged your rock and gave you a paper cut.'
  if (playerMove === 'rock' && enemyMove === 'paper') return 'enemy'
  roundResultText = 'The enemy brought scissors to a rock fight and was crushed.'
  if (playerMove === 'rock' && enemyMove === 'scissor') return 'player'
  roundResultText = 'The enemy cut all your hair of with a pair of scissors while you failed to give him a paper cut.'
  if (playerMove === 'paper' && enemyMove === 'scissor') return 'enemy'
  roundResultText = 'You caught the enemy\'s rock with your paper and threw it back at him.'
  if (playerMove === 'paper' && enemyMove === 'rock') return 'player'
  roundResultText = 'You tried to stop a rock flying at you with a pair of saftey scissors and it didn\'t go well.'
  if (playerMove === 'scissor' && enemyMove === 'rock') return 'enemy'
  roundResultText = 'Not even the strongest paper could protect the enemy from your sharp scissors.'
  if (playerMove === 'scissor' && enemyMove === 'paper') return 'player'
}

const playerWinsRound = function () {
  ui.updateRoundResult(roundResultText)
  currentEnemy.health -= currentAdventurer.attack
  ui.updateEncounter(currentEnemy)
}

const enemyWinsRound = function () {
  ui.updateRoundResult(roundResultText)
  currentAdventurer.health -= currentEnemy.attack
  ui.updateAdventurerInfo(currentAdventurer)
}

const drawRound = function () {
  ui.updateRoundResult(roundResultText)
}

/**
 * Returns random hash key based on weights
 * https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
 * @param  {[type]} weightHash Weight hash in the form {key: 0 to 1 chance}
 * @return {[type]}            Random key
 */
const weightedRandomAttack = function (weightHash) {
  let sum = 0
  const r = Math.random()
  for (const i in weightHash) {
    sum += parseFloat(weightHash[i])
    if (r <= sum) return i
  }
}

module.exports = {
  startGame,
  playerAction
}
