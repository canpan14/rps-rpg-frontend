'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignIn = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onSignUp = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const clearModalFormOnHide = function (event) {
  ui.clearModalFormOnHide(event)
}

const registerHandlers = function () {
  $('#signIn').on('submit', onSignIn)
  $('#signUp').on('submit', onSignUp)
  $('#changePassword').on('submit', onChangePassword)
  $('#signOut').on('click', onSignOut)

  $('#signInModal').on('hidden.bs.modal', clearModalFormOnHide)
  $('#signUpModal').on('hidden.bs.modal', clearModalFormOnHide)
  $('#changePasswordModal').on('hidden.bs.modal', clearModalFormOnHide)
}

module.exports = {
  registerHandlers
}
