'use strict'

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

const adjustEnemyWeights = function (playerMove, enemyWeights) {
  const learningCurve = 0.1
  let addToCounter = 0.0
  let subtractFromLoser = 0.0
  switch (playerMove) {
    case 'rock':
      addToCounter = (1 - enemyWeights.paperChance) * learningCurve
      subtractFromLoser = (enemyWeights.scissorChance) * learningCurve
      enemyWeights.paperChance += addToCounter
      enemyWeights.scissorChance -= subtractFromLoser
      enemyWeights.rockChance += subtractFromLoser - addToCounter
      break
    case 'paper':
      addToCounter = (1 - enemyWeights.scissorChance) * learningCurve
      subtractFromLoser = (enemyWeights.rockChance) * learningCurve
      enemyWeights.scissorChance += addToCounter
      enemyWeights.rockChance -= subtractFromLoser
      enemyWeights.paperChance += subtractFromLoser - addToCounter
      break
    case 'scissor':
      addToCounter = (1 - enemyWeights.rockChance) * learningCurve
      subtractFromLoser = (enemyWeights.paperChance) * learningCurve
      enemyWeights.rockChance += addToCounter
      enemyWeights.paperChance -= subtractFromLoser
      enemyWeights.scissorChance += subtractFromLoser - addToCounter
      break
  }
  return enemyWeights
}

module.exports = {
  weightedRandomAttack,
  adjustEnemyWeights
}
