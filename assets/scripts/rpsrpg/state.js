'use strict'

const Enemy = require('./enemy')

const State = function (state) {
  this.id = state.id
  this.advHealth = parseInt(state.a_health)
  this.advAttack = parseInt(state.a_attack)
  this.inFight = state.in_fight
  if (state.in_fight) {
    this.enemy = Enemy.createEnemyFromSave(state)
  } else {
    this.enemy = null
  }
}

const createState = function (state) {
  return new State(state)
}

module.exports = {
  createState
}
