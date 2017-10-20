'use strict'

const store = require('../store')
const advTableHandlebar = require('../templates/adventurerTable.handlebars')
const encounterHandlebar = require('../templates/encounter.handlebars')
const adventurerInfoHandlebar = require('../templates/adventurerInfo.handlebars')

const onSignInSuccess = function (response) {
  $('#signInModal').modal('hide')
  greenNotification('Signed in successfully')
  store.user = response.user
  $('.activeBeforeSignIn').hide()
  $('.activeAfterSignIn').show()
  $('#createAdventurerBtn').attr('disabled', false)
  $('#viewAdventurers').attr('disabled', false)
}

const onSignInFailure = function () {
  redNotification('Sign in failed. Username and password did not match.')
}

const onSignOutSuccess = function () {
  greenNotification('Signed out successfully')
  delete store.user
  $('#encounterInfo').empty()
  $('#roundResult').empty()
  $('#endRoundMessage').empty()
  $('.activeAfterSignIn').hide()
  $('.activeBeforeSignIn').show()
  $('#createAdventurerBtn').attr('disabled', true)
  $('#viewAdventurers').attr('disabled', true)
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

const onCreateAdventurerFailure = function (error) {
  redNotification('You cannot have two living adventurers with the same name')
  console.log(error)
}

const onViewAdventurersSuccess = function (response) {
  $('#adventurersTableContainer').empty()
  $('#adventurersTableContainer').append(advTableHandlebar(response))
  $('#adventurersTableContainer').css('display', 'table')
}

const onViewAdventurersFailure = function (error) {
  console.log(error)
}

const onShowAdventurerSuccess = function (response) {
  greenNotification('Beginning adventure with ' + response.adventurer.name)
}

const onShowAdventurerFailure = function (error) {
  console.log(error)
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
  clearModalFormOnHide
}
