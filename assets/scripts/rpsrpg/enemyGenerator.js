'use strict'

const api = require('./api')
const Modifier = require('./modifier')
const Enemy = require('./enemy')

let levelToGenerateAs

const generateEnemy = function (level) {
  levelToGenerateAs = level
  return baseEnemy()
    .then(adjustLevel)
    .then(allocateStatPoints)
    .then(adjustEnemyForPrefix)
    .then(adjustEnemyForSuffix)
    .then((enemy) => {
      return normalizeWeights(enemy)
    })
}

const baseEnemy = function () {
  return api.viewEnemies()
    .then((response) => {
      const enemies = response.enemies
      const enemy = Enemy.createEnemy(enemies[Math.floor(Math.random() * enemies.length)])
      return enemy
    })
}

const adjustLevel = function (enemy) {
  return api.showLevel(levelToGenerateAs)
    .then((response) => {
      enemy.level = levelToGenerateAs
      enemy.health = response.level.health
      enemy.attack = response.level.attack
      enemy.exp = response.level.number * 4
      return enemy
    })
}

const allocateStatPoints = function (enemy) {
  for (let i = 0; i < 10; i++) {
    if (Math.random() < 0.5) {
      enemy.health += 2
    } else {
      enemy.attack += 1
    }
  }
  return enemy
}

const adjustEnemyForPrefix = function (enemy) {
  return api.viewEnemyModifiers()
    .then((response) => {
      const prefixArray = response.enemy_modifiers.filter(modifier => modifier.is_prefix === true)
      const randomPrefix = Modifier.createModifier(prefixArray[Math.floor(Math.random() * prefixArray.length)])
      enemy.name = randomPrefix.name + ' ' + enemy.name
      enemy.rockChance += randomPrefix.rockChance
      enemy.paperChance += randomPrefix.paperChance
      enemy.scissorChance += randomPrefix.scissorChance
      enemy.learningCurve += randomPrefix.learningCurve
      enemy.health = enemy.health * randomPrefix.healthMult
      enemy.attack = enemy.attack * randomPrefix.attackMult
      return enemy
    })
}

const adjustEnemyForSuffix = function (enemy) {
  return api.viewEnemyModifiers()
    .then((response) => {
      const suffixArray = response.enemy_modifiers.filter(modifier => modifier.is_prefix === false)
      const randomSuffix = Modifier.createModifier(suffixArray[Math.floor(Math.random() * suffixArray.length)])
      enemy.name = enemy.name + ' ' + randomSuffix.name
      enemy.rockChance += randomSuffix.rockChance
      enemy.paperChance += randomSuffix.paperChance
      enemy.scissorChance += randomSuffix.scissorChance
      enemy.learningCurve += randomSuffix.learningCurve
      enemy.health = Math.round(enemy.health * randomSuffix.healthMult)
      enemy.attack = Math.round(enemy.attack * randomSuffix.attackMult)
      return enemy
    })
}

const normalizeWeights = function (enemy) {
  const weights = [enemy.rockChance, enemy.paperChance, enemy.scissorChance]
  const total = weights.reduce((a, b) => a + b)
  const normWeights = weights.map(v => v / total)
  enemy.rockChance = normWeights[0]
  enemy.paperChance = normWeights[1]
  enemy.scissorChance = normWeights[2]
  return enemy
}

module.exports = {
  generateEnemy
}
