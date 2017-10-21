'use strict'

const api = require('./api')
const Modifier = require('./modifier')
const Enemy = require('./enemy')

let enemyToGenerate

const generateEnemy = function () {
  return baseEnemy()
    .then(adjustEnemyForPrefix)
    .then(adjustEnemyForSuffix)
    .then(normalizeWeights)
    .then(() => {
      return enemyToGenerate
    })
}

const baseEnemy = function () {
  return api.viewEnemies()
    .then((response) => {
      const enemies = response.enemies
      enemyToGenerate = Enemy.createEnemy(enemies[Math.floor(Math.random() * enemies.length)])
    })
}

const adjustEnemyForPrefix = function () {
  return api.viewEnemyModifiers()
    .then((response) => {
      const prefixArray = response.enemy_modifiers.filter(modifier => modifier.is_prefix === true)
      const randomPrefix = Modifier.createModifier(prefixArray[Math.floor(Math.random() * prefixArray.length)])
      enemyToGenerate.name = randomPrefix.name + ' ' + enemyToGenerate.name
      enemyToGenerate.rockChance += randomPrefix.rockChance
      enemyToGenerate.paperChance += randomPrefix.paperChance
      enemyToGenerate.scissorChance += randomPrefix.scissorChance
      enemyToGenerate.learningCurve += randomPrefix.learningCurve
      enemyToGenerate.health = Math.round(enemyToGenerate.health * randomPrefix.healthMult)
      enemyToGenerate.attack = Math.round(enemyToGenerate.attack * randomPrefix.attackMult)
    })
}

const adjustEnemyForSuffix = function () {
  return api.viewEnemyModifiers()
    .then((response) => {
      const suffixArray = response.enemy_modifiers.filter(modifier => modifier.is_prefix === false)
      const randomSuffix = Modifier.createModifier(suffixArray[Math.floor(Math.random() * suffixArray.length)])
      enemyToGenerate.name = enemyToGenerate.name + ' ' + randomSuffix.name
      enemyToGenerate.rockChance += randomSuffix.rockChance
      enemyToGenerate.paperChance += randomSuffix.paperChance
      enemyToGenerate.scissorChance += randomSuffix.scissorChance
      enemyToGenerate.learningCurve += randomSuffix.learningCurve
      enemyToGenerate.health = Math.round(enemyToGenerate.health * randomSuffix.healthMult)
      enemyToGenerate.attack = Math.round(enemyToGenerate.attack * randomSuffix.attackMult)
    })
}

const normalizeWeights = function () {
  const weights = [enemyToGenerate.rockChance, enemyToGenerate.paperChance, enemyToGenerate.scissorChance]
  const total = weights.reduce((a, b) => a + b)
  const normWeights = weights.map(v => v / total)
  enemyToGenerate.rockChance = normWeights[0]
  enemyToGenerate.paperChance = normWeights[1]
  enemyToGenerate.scissorChance = normWeights[2]
}

module.exports = {
  generateEnemy
}
