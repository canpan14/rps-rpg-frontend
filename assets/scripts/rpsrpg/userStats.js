'use strict'

const UserStats = function () {
  this.created = 0
  this.alive = 0
  this.dead = 0
  this.highestLevel = 0
  this.rockCount = 0
  this.paperCount = 0
  this.scissorCount = 0
}

const createUserStats = function () {
  return new UserStats()
}

module.exports = {
  createUserStats
}
