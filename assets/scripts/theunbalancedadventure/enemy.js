'use strict'

const Enemy = function (enemy) {
  this.name = enemy.name
  this.level = enemy.level.number
  this.attack = enemy.level.attack
  this.health = enemy.level.health
  this.attack_chance = enemy.attack_chance
  this.dodge_chance = enemy.dodge_chance
  this.predict_dodge_chance = enemy.predict_dodge_chance
}

const createEnemy = function (enemy) {
  return new Enemy(enemy)
}

module.exports = {
  createEnemy
}
