'use strict'

const config = require('../config')
const store = require('../store')

const signIn = function (formData) {
  return $.ajax({
    url: config.apiOrigin + 'sign-in',
    method: 'POST',
    data: formData
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + 'sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = function (formData) {
  return $.ajax({
    url: config.apiOrigin + 'change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const signUp = function (formData) {
  return $.ajax({
    url: config.apiOrigin + 'sign-up',
    method: 'POST',
    data: formData
  })
}

const createAdventurer = function (formData) {
  return $.ajax({
    url: config.apiOrigin + 'adventurers',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const viewAdventurers = function () {
  return $.ajax({
    url: config.apiOrigin + 'adventurers',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showAdventurer = function (advId) {
  return $.ajax({
    url: config.apiOrigin + 'adventurers/' + advId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateAdventurer = function (advId, adv) {
  return $.ajax({
    url: config.apiOrigin + 'adventurers/' + advId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'adventurer': {
        'level_id': adv.level,
        'current_exp': adv.currentExp,
        'is_alive': adv.isAlive,
        'rock_count': adv.rockCount,
        'paper_count': adv.paperCount,
        'scissor_count': adv.scissorCount,
        'kills': adv.kills
      }
    }
  })
}

const destroyAdventurer = function (advId) {
  return $.ajax({
    url: config.apiOrigin + 'adventurers/' + advId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const viewEnemies = function () {
  return $.ajax({
    url: config.apiOrigin + 'enemies',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const viewEnemyModifiers = function () {
  return $.ajax({
    url: config.apiOrigin + 'enemy_modifiers',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const saveState = function (save) {
  return $.ajax({
    url: config.apiOrigin + 'states/' + save.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'state': {
        'a_health': save.advHealth,
        'a_attack': save.advAttack,
        'in_fight': save.inFight,
        'e_name': save.enemy.name,
        'e_level': save.enemy.level,
        'e_exp': save.enemy.exp,
        'e_attack': save.enemy.attack,
        'e_health': save.enemy.health,
        'e_rock_chance': save.enemy.rockChance,
        'e_paper_chance': save.enemy.paperChance,
        'e_scissor_chance': save.enemy.scissorChance,
        'e_learning_curve': save.enemy.learningCurve
      }
    }
  })
}

const destroyState = function (stateId) {
  return $.ajax({
    url: config.apiOrigin + 'states/' + stateId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showLevel = function (level) {
  return $.ajax({
    url: config.apiOrigin + 'levels/' + level,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signIn,
  signOut,
  changePassword,
  signUp,
  createAdventurer,
  viewAdventurers,
  showAdventurer,
  updateAdventurer,
  destroyAdventurer,
  viewEnemies,
  viewEnemyModifiers,
  saveState,
  destroyState,
  showLevel
}
