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

const createEnemyFromSave = function (save) {
  this.name = save.name
  this.level = parseInt(save.e_level)
  this.exp = parseInt(save.e_exmp)
  this.attack = parseInt(save.e_attack)
  this.health = parseInt(save.e_health)
  this.rockChance = parseFloat(save.e_rock_chance)
  this.paperChance = parseFloat(save.e_paper_chance)
  this.scissorChance = parseFloat(save.e_scissor_chance)
  this.learningCurve = parseFloat(save.e_learning_curve)
}

module.exports = {
  createEnemy,
  createEnemyFromSave
}
