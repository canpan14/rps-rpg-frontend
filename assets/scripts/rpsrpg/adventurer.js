'use strict'

const Adventurer = function (adv) {
  this.id = adv.id
  this.name = adv.name
  this.level = parseInt(adv.level.number)
  this.health = parseInt(adv.level.health)
  this.attack = parseInt(adv.level.attack)
  this.expNeeded = parseInt(adv.level.exp_needed)
  this.currentExp = parseInt(adv.current_exp)
  this.isAlive = adv.is_alive
  this.rockCount = parseInt(adv.rock_count)
  this.paperCount = parseInt(adv.paper_count)
  this.scissorCount = parseInt(adv.scissor_count)
}

const createAdventurer = function (adv) {
  return new Adventurer(adv)
}

module.exports = {
  createAdventurer
}
