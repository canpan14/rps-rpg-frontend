'use strict'

const Modifier = function (suffix) {
  this.name = suffix.text
  this.rockChance = parseFloat(suffix.rock_chance)
  this.paperChance = parseFloat(suffix.paper_chance)
  this.scissorChance = parseFloat(suffix.scissor_chance)
  this.learningCurve = parseFloat(suffix.learning_curve)
  this.healthMult = parseFloat(suffix.health_mult)
  this.attackMult = parseFloat(suffix.attack_mult)
}

const createModifier = function (enemy) {
  return new Modifier(enemy)
}

module.exports = {
  createModifier
}
