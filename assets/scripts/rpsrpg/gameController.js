'use strict'

const api = require('./api')
const ui = require('./ui')
const Adventurer = require('./adventurer')
const enemyGenerator = require('./enemyGenerator')
const weightAdjustor = require('./weightAdjustor')

let currentAdventurer
let currentEnemy
let saveState
let roundResultText
let fightOver = true

const getCurrentAdventurerId = () => currentAdventurer.id

const startGame = function (advInfo) {
  currentAdventurer = Adventurer.createAdventurer(advInfo.adventurer)
  saveState = currentAdventurer.saveState
  if (saveState.inFight) {
    currentAdventurer.health = saveState.advHealth
    currentAdventurer.attack = saveState.advAttack
    ui.updateAdventurerInfo(currentAdventurer)
    loadEncounter()
  } else {
    ui.updateAdventurerInfo(currentAdventurer)
    newEncounter()
  }
}

const newEncounter = function () {
  ui.updateEndRoundMessage('')
  enemyGenerator.generateEnemy(currentAdventurer.level)
    .then((enemyGenerated) => {
      fightOver = false
      currentEnemy = enemyGenerated
      saveState.enemy = currentEnemy
      updateSaveState()
      saveCurrentState()
      ui.updateEncounter(currentEnemy)
    })
}

const loadEncounter = function () {
  fightOver = false
  ui.updateEndRoundMessage('')
  currentEnemy = saveState.enemy
  ui.updateEncounter(currentEnemy)
}

const updateSaveState = function () {
  saveState.inFight = !fightOver
  saveState.advHealth = currentAdventurer.health
  saveState.advAttack = currentAdventurer.attack
  saveState.enemy.name = currentEnemy.name
  saveState.enemy.level = currentEnemy.level
  saveState.enemy.exp = currentEnemy.exp
  saveState.enemy.health = currentEnemy.health
  saveState.enemy.attack = currentEnemy.attack
  saveState.enemy.rockChance = currentEnemy.rockChance
  saveState.enemy.paperChance = currentEnemy.paperChance
  saveState.enemy.scissorChance = currentEnemy.scissorChance
  saveState.enemy.learningCurve = currentEnemy.learningCurve
}

const saveCurrentState = function () {
  api.saveState(saveState)
    .then(ui.onSaveStateSuccess)
    .catch(ui.onSaveStateFailure)
}

const playerAction = function (moveChoice) {
  if (fightOver) {
    return
  }

  switch (moveChoice) {
    case 'rock':
      currentAdventurer.rockCount++
      break
    case 'paper':
      currentAdventurer.paperCount++
      break
    case 'scissor':
      currentAdventurer.scissorCount++
      break
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
    adjustWeights(moveChoice)
  }
  updateSaveState()
  saveCurrentState()
}

const adjustWeights = function (moveChoice) {
  const newWeights = weightAdjustor.adjustEnemyWeights(moveChoice, {
    'rockChance': currentEnemy.rockChance,
    'paperChance': currentEnemy.paperChance,
    'scissorChance': currentEnemy.scissorChance
  })
  currentEnemy.rockChance = newWeights.rockChance
  currentEnemy.paperChance = newWeights.paperChance
  currentEnemy.scissorChance = newWeights.scissorChance
}

const enemyAction = function () {
  const actionToTake = weightAdjustor.weightedRandomAttack({'rock': currentEnemy.rockChance,
    'paper': currentEnemy.paperChance,
    'scissor': currentEnemy.scissorChance})
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
  ui.enemyDies(currentEnemy)
  currentAdventurer.kills++
  currentAdventurer.currentExp += currentEnemy.exp
  checkForLevelUp()
  updateAdventurerOnServer()
}

const playerDies = function () {
  fightOver = true
  currentAdventurer.isAlive = false
  ui.playerDies()
  updateAdventurerOnServer()
}

const checkForLevelUp = function () {
  if (!currentAdventurer.expNeeded) return
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

module.exports = {
  startGame,
  playerAction,
  getCurrentAdventurerId
}
