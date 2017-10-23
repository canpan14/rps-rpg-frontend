'use strict'

const Enemy = require('./enemy')

const State = function (state) {
  this.advHealth = parseInt(state.a_health)
  this.advAttack = parseInt(state.a_attack)
  this.inFight = state.in_fight
  this.enemyName = state.e_name
  this.enemyLevel = parseInt(state.e_level)
  this.enemyExp = parseInt(state.e_exp)
  this.enemyAttack = parseInt(state.e_attack)
  this.enemyHealth = parseInt(state.e_health)
  this.enemyRockChance = parseFloat(state.e_rock_chance)
  this.enemyPaperChance = parseFloat(state.e_paper_chance)
  this.enemyScissorChance = parseFloat(state.e_scissor_chance)
  this.enemyLearningCurve = parseFloat(state.e_learning_curve)
  this.enemy = Enemy.createEnemyFromSave(state)
}

const createState = function (state) {
  return new State(state)
}

module.exports = {
  createState
}
