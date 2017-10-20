'use strict'

const Enemy = function (enemy) {
  this.name = enemy.name
  this.level = enemy.level.number
  this.exp = enemy.level.number * 3
  this.attack = enemy.level.attack
  this.health = enemy.level.health
  this.rock_chance = enemy.rock_chance
  this.paper_chance = enemy.paper_chance
  this.scissor_chance = enemy.scissor_chance
}

const createEnemy = function (enemy) {
  return new Enemy(enemy)
}

module.exports = {
  createEnemy
}
