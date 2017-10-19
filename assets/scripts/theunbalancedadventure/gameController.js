'use strict'

const api = require('./api')
const ui = require('./ui')
const Enemy = require('./enemy')
const Adventurer = require('./adventurer')

let currentAdventurer
let currentEnemy
let roundResultText

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
}

const enemyAction = function () {
  const actionToTake = weightedRandomAttack({'attack': currentEnemy.attack_chance,
    'dodge': currentEnemy.dodge_chance,
    'predict': currentEnemy.predict_dodge_chance})
  return actionToTake
}

const roundResult = function (playerMove, enemyMove) {
  roundResultText = 'Both sides used ' + playerMove + ' and it was a stalemate.'
  if (playerMove === enemyMove) return 'draw'
  roundResultText = 'The enemy dodged your attack and struck you back.'
  if (playerMove === 'attack' && enemyMove === 'dodge') return 'enemy'
  roundResultText = 'The enemy thought the you would dodge and was hit by your attack.'
  if (playerMove === 'attack' && enemyMove === 'predict') return 'player'
  roundResultText = 'The enemy predict you would try and dodge them and landed a blow.'
  if (playerMove === 'dodge' && enemyMove === 'predict') return 'enemy'
  roundResultText = 'You predicted the enemy\'s attack and were able to parry it and land a hit.'
  if (playerMove === 'dodge' && enemyMove === 'attack') return 'player'
  roundResultText = 'You thought the enemy would dodge you but they launched an attack and smacked you.'
  if (playerMove === 'predict' && enemyMove === 'attack') return 'enemy'
  roundResultText = 'You knew the enemy was going to try to dodge and were able to land your attack.'
  if (playerMove === 'predict' && enemyMove === 'dodge') return 'player'
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
