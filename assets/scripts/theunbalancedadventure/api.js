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

module.exports = {
  signIn,
  signOut,
  changePassword,
  signUp,
  createAdventurer,
  viewAdventurers
}
