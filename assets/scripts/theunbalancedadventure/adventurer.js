'use strict'

const Adventurer = function (adv) {
  this.name = adv.name
  this.level = adv.level.number
  this.health = adv.level.health
  this.attack = adv.level.attack
  this.expNeeded = adv.level.exp_needed
  this.currentExp = adv.currentExp
}

const createAdventurer = function (adv) {
  return new Adventurer(adv)
}

module.exports = {
  createAdventurer
}
