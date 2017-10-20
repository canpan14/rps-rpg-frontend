'use strict'

const Enemy = function (enemy) {
  this.name = enemy.name
  this.level = parseInt(enemy.level.number)
  this.exp = parseInt(enemy.level.number * 3)
  this.attack = parseInt(enemy.level.attack)
  this.health = parseInt(enemy.level.health)
  this.rockChance = parseFloat(enemy.rock_chance)
  this.paperChance = parseFloat(enemy.paper_chance)
  this.scissorChance = parseFloat(enemy.scissor_chance)
  this.learningCurve = parseFloat(enemy.learning_curve)
}

const createEnemy = function (enemy) {
  return new Enemy(enemy)
}

module.exports = {
  createEnemy
}
