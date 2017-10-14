'use strict'

const store = require('../store')

const onSignInSuccess = function (response) {
  $('#signInModal').modal('hide')
  greenNotification('Signed in successfully')
  store.user = response.user
  $('.activeBeforeSignIn').hide()
  $('.activeAfterSignIn').show()
}

const onSignInFailure = function () {
  redNotification('Sign in failed. Username and password did not match.')
}

const onSignOutSuccess = function () {
  greenNotification('Signed out successfully')
  delete store.user
  $('.activeAfterSignIn').hide()
  $('.activeBeforeSignIn').show()
}

const onSignOutFailure = function () {
  greenNotification('Signed out successfully')
  delete store.user
  $('.activeAfterSignIn').hide()
  $('.activeBeforeSignIn').show()
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
  clearModalFormOnHide
}
