'use strict'

const Enemy = function (enemy) {
  this.name = enemy.name
  this.level = parseInt(enemy.level.number)
  this.exp = parseInt(enemy.level.number * 3)
  this.attack = parseInt(enemy.level.attack)
  this.health = parseInt(enemy.level.health)
  this.rock_chance = parseFloat(enemy.rock_chance)
  this.paper_chance = parseFloat(enemy.paper_chance)
  this.scissor_chance = parseFloat(enemy.scissor_chance)
}

const createEnemy = function (enemy) {
  return new Enemy(enemy)
}

module.exports = {
  createEnemy
}
