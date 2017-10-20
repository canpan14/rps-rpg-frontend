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
    enemyDies()
  } else if (currentAdventurer.health <= 0) {
    playerDies()
  } else {
    adjustEnemyWeights(moveChoice)
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
  roundResultText = 'The enemy cut all your hair off with a pair of scissors while you failed to give him a paper cut.'
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

const enemyDies = function () {
  fightOver = true
  ui.updateEndRoundMessage('The ' + currentEnemy.name + ' has been slain.')

  currentAdventurer.currentExp += currentEnemy.exp
  checkForLevelUp()
  updateAdventurerOnServer()
}

const playerDies = function () {
  fightOver = true
  ui.updateEndRoundMessage('You have died.')
}

const checkForLevelUp = function () {
  if (currentAdventurer.expNeeded === -1) return
  if (currentAdventurer.currentExp >= currentAdventurer.expNeeded) {
    currentAdventurer.level += 1
  }
}

const updateAdventurerOnServer = function () {
  api.updateAdventurer(currentAdventurer.id, currentAdventurer)
    .then((response) => {
      currentAdventurer = Adventurer.createAdventurer(response.adventurer)
      ui.updateAdventurerInfo(currentAdventurer)
    })
    .catch((error) => console.log(error))
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
    sum += weightHash[i]
    if (r <= sum) return i
  }
}

const adjustEnemyWeights = function (playerMove) {
  const learningCurve = 0.1
  let addToCounter = 0.0
  let subtractFromLoser = 0.0
  switch (playerMove) {
    case 'rock':
      addToCounter = (1 - currentEnemy.paper_chance) * learningCurve
      subtractFromLoser = (currentEnemy.scissor_chance) * learningCurve
      currentEnemy.paper_chance += addToCounter
      currentEnemy.scissor_chance -= subtractFromLoser
      currentEnemy.rock_chance += subtractFromLoser - addToCounter
      break
    case 'paper':
      addToCounter = (1 - currentEnemy.scissor_chance) * learningCurve
      subtractFromLoser = (currentEnemy.rock_chance) * learningCurve
      currentEnemy.scissor_chance += addToCounter
      currentEnemy.rock_chance -= subtractFromLoser
      currentEnemy.paper_chance += subtractFromLoser - addToCounter
      break
    case 'scissor':
      addToCounter = (1 - currentEnemy.rock_chance) * learningCurve
      subtractFromLoser = (currentEnemy.paper_chance) * learningCurve
      currentEnemy.rock_chance += addToCounter
      currentEnemy.paper_chance -= subtractFromLoser
      currentEnemy.scissor_chance += subtractFromLoser - addToCounter
      break
  }
  console.log(currentEnemy)
}

module.exports = {
  startGame,
  playerAction
}