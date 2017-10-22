'use strict'

const Adventurer = function (adv) {
  this.id = adv.id
  this.name = adv.name
  this.level = adv.level.number
  this.health = adv.level.health
  this.attack = adv.level.attack
  this.expNeeded = adv.level.exp_needed
  this.currentExp = adv.current_exp
  this.isAlive = adv.is_alive
  this.rockCount = adv.rock_count
  this.paperCount = adv.paper_count
  this.scissorCount = adv.scissor_count
}

const createAdventurer = function (adv) {
  return new Adventurer(adv)
}

module.exports = {
  createAdventurer
}
