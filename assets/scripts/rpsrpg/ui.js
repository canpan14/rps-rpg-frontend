'use strict'

const store = require('../store')
const UserStats = require('./userStats')
const advTableHandlebar = require('../templates/adventurerTable.handlebars')
const encounterHandlebar = require('../templates/encounter.handlebars')
const adventurerInfoHandlebar = require('../templates/adventurerInfo.handlebars')
const noAdvYetHandlebar = require('../templates/noAdventurersYet.handlebars')
const mainGameTabHandlebar = require('../templates/mainGameTabSetup.handlebars')
const adventurerDiesHandlebar = require('../templates/adventurerDies.handlebars')
const enemyDiesHandlebar = require('../templates/enemyDies.handlebars')
const advStatsTabDropdownHandlebar = require('../templates/advStatsTabDropdown.handlebars')
const advTabHandlebar = require('../templates/advStatsTab.handlebars')
const userStatsTableHandlebar = require('../templates/userStatsTable.handlebars')

const onSignInSuccess = function (response) {
  $('#signInModal').modal('hide')
  greenNotification('Signed in successfully')
  store.user = response.user
  $('.activeBeforeSignIn').hide()
  $('.activeAfterSignIn').show()
  $('#collapseTabs').collapse('show')
}

const onSignInFailure = function () {
  redNotification('Sign in failed. Username and password did not match.')
}

const onSignOutSuccess = function () {
  greenNotification('Signed out successfully')
  delete store.user
  $('#collapseTabs').collapse('hide')
  $('#chooseAdv').empty()
  $('#mainGame').empty()
  $('#chooseAdventurerTab').tab('show')
  $('#encounterInfo').empty()
  $('#roundResult').empty()
  $('#endRoundMessage').empty()
  $('.activeAfterSignIn').hide()
  $('.activeBeforeSignIn').show()
}

const onSignOutFailure = function () {
  onSignOutSuccess()
}

const onChangePasswordSuccess = function () {
  $('#changePasswordModal').modal('hide')
  greenNotification('Changed password successfully')
}

const onChangePasswordFailure = function () {
  redNotification('Old or new password is invalid')
}

const onSignUpSuccess = function () {
  $('#signUpModal').modal('hide')
  greenNotification('Signed up successfully', 1500)
}

const onSignUpFailure = function () {
  redNotification('Email is in use or passwords didn\'t match')
}

const onCreateAdventurerSuccess = function (response) {
  $('#createAdventurerModal').modal('hide')
  greenNotification('Adventurer created')
}

const onCreateAdventurerFailure = function () {
  redNotification('Failed to create adventurer, try again later')
}

const onViewAdventurersSuccess = function (response) {
  $('#chooseAdv').empty()
  $('#chooseAdv').append(advTableHandlebar(response))
}

const onViewAdventurersFailure = function () {
  redNotification('Failed to load adventurers, try again later')
}

const onShowAdventurerSuccess = function (response) {
  greenNotification('Adventuring with ' + response.adventurer.name)
}

const onShowAdventurerFailure = function () {
  redNotification('Failed to load adventurer, try again later')
}

const updateEncounter = function (enemy) {
  $('#encounterInfo').empty()
  $('#encounterInfo').append(encounterHandlebar(enemy))
}

const updateRoundResult = function (text) {
  $('#roundResult').text(text)
}

const updateAdventurerInfo = function (adv) {
  $('#advInfo').empty()
  $('#advInfo').append(adventurerInfoHandlebar(adv))
}

const updateEndRoundMessage = function (text) {
  $('#endRoundMessage').text(text)
}

const updateAdvStatsTabDropdown = function (response) {
  response.adventurers = response.adventurers.sort(function (a, b) {
    const upA = a.name.toUpperCase()
    const upB = b.name.toUpperCase()
    if (upA < upB) return -1
    if (upA > upB) return 1
    return 0
  })
  $('#advStatsTabDropdownContent').empty()
  $('#advStatsTabDropdownContent').append(advStatsTabDropdownHandlebar(response))
}

const updateAdvTab = function (response) {
  $('#advStats').empty()
  $('#advStats').append(advTabHandlebar(response.adventurer))
}

const updateUserStatsTab = function (response) {
  const userStatsHolder = UserStats.createUserStats()
  const advList = response.adventurers
  userStatsHolder.created = advList.length
  userStatsHolder.alive = advList.filter(adv => adv.is_alive).length
  userStatsHolder.dead = advList.filter(adv => !adv.is_alive).length
  userStatsHolder.highestLevel = advList.reduce((a, b) => a > b.level.number ? a : b.level.number, 0)
  userStatsHolder.rockCount = advList.reduce((a, b) => a + b.rock_count, 0)
  userStatsHolder.paperCount = advList.reduce((a, b) => a + b.paper_count, 0)
  userStatsHolder.scissorCount = advList.reduce((a, b) => a + b.scissor_count, 0)
  $('#userStats').empty()
  $('#userStats').append(userStatsTableHandlebar(userStatsHolder))
}

const userHasNoAdventurers = function () {
  $('#chooseAdv').empty()
  $('#chooseAdv').append(noAdvYetHandlebar())
}

const setUpMainGameTab = function () {
  $('#mainGame').empty()
  $('#mainGame').append(mainGameTabHandlebar())
}

const playerDies = function () {
  $('#mainGame').empty()
  $('#mainGame').append(adventurerDiesHandlebar())
  $('#chooseAdvFromDead').on('click', () => $('#chooseAdventurerTab').tab('show'))
}

const enemyDies = function (enemy) {
  $('#mainGame').empty()
  $('#mainGame').append(enemyDiesHandlebar(enemy))
  $('#chooseAdvFromDead').on('click', () => $('#chooseAdventurerTab').tab('show'))
}

const clearModalFormOnHide = function (event) {
  $(event.target).find('form')[0].reset()
}

const greenNotification = function (text, time = 1000) {
  $.notify({
    message: text
  }, {
    type: 'success',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: false,
    z_index: 1070,
    delay: time,
    timer: 500
  })
}

const redNotification = function (text, time = 1000) {
  $.notify({
    message: text
  }, {
    type: 'danger',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: false,
    z_index: 1070,
    delay: time,
    timer: 500
  })
}

module.exports = {
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onCreateAdventurerSuccess,
  onCreateAdventurerFailure,
  onViewAdventurersSuccess,
  onViewAdventurersFailure,
  onShowAdventurerSuccess,
  onShowAdventurerFailure,
  updateEncounter,
  updateRoundResult,
  updateAdventurerInfo,
  updateEndRoundMessage,
  updateAdvStatsTabDropdown,
  updateAdvTab,
  updateUserStatsTab,
  userHasNoAdventurers,
  setUpMainGameTab,
  playerDies,
  enemyDies,
  clearModalFormOnHide
}
