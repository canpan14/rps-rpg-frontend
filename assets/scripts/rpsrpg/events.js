'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const gameController = require('./gameController')
const store = require('../store')

const onSignIn = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .then(setUpChooseAdventurersTab)
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

const onCreateAdventurer = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.createAdventurer(formData)
    .then(ui.onCreateAdventurerSuccess)
    .then(setUpChooseAdventurersTab)
    .catch(ui.onCreateAdventurerFailure)
}

const onViewAdventurers = function () {
  return api.viewAdventurers()
    .catch(ui.onViewAdventurersFailure)
}

const onStartGameWithAdventurer = function (event) {
  event.preventDefault()
  api.showAdventurer(event.currentTarget.id)
    .then((response) => {
      ui.onShowAdventurerSuccess(response)
      if (!response.adventurer.is_alive) throw new Error('Tried to load dead adventurer')
      return response
    })
    .then((response) => {
      ui.setUpMainGameTab()
      $('#rock').on('click', () => gameController.playerAction('rock'))
      $('#paper').on('click', () => gameController.playerAction('paper'))
      $('#scissor').on('click', () => gameController.playerAction('scissor'))
      $('#goAdventuringTab').removeClass('disabled')
      $('#goAdventuringTab').tab('show')
      return response
    })
    .then(gameController.startGame)
    .catch(ui.onShowAdventurerFailure)
}

const continueGameWithAdventurer = function (event) {
  event.preventDefault()
  api.showAdventurer(gameController.getCurrentAdventurerId())
    .then((response) => {
      ui.onShowAdventurerSuccess(response)
      return response
    })
    .then((response) => {
      ui.setUpMainGameTab()
      $('#rock').on('click', () => gameController.playerAction('rock'))
      $('#paper').on('click', () => gameController.playerAction('paper'))
      $('#scissor').on('click', () => gameController.playerAction('scissor'))
      return response
    })
    .then(gameController.startGame)
    .catch(ui.onShowAdventurerFailure)
}

const setUpUserStatsTab = function () {
  api.viewAdventurers()
    .then(ui.updateUserStatsTab)
    .catch(ui.onViewAdventurersFailure)
}

const setUpChooseAdventurersTab = function () {
  if (!store.user) return
  onViewAdventurers()
    .then((response) => {
      console.log(response)
      ui.updateAdvStatsTabDropdown(Object.assign({}, response))
      $('#advStatsTabDropdownContent a').on('click', loadAdvStatsTab)
      response.adventurers = response.adventurers.filter(adv => adv.is_alive)
      if (response.adventurers && response.adventurers.length > 0) {
        ui.onViewAdventurersSuccess(response)
        $('#myAdventurers > tbody > tr').on('click', onStartGameWithAdventurer)
      } else {
        ui.userHasNoAdventurers()
      }
    })
}

const loadAdvStatsTab = function (event) {
  const advDropdownId = $(this).attr('data-id')
  api.showAdventurer(advDropdownId)
    .then(ui.updateAdvTab)
    .catch(ui.onShowAdventurerFailure)
}

const clearModalFormOnHide = function (event) {
  ui.clearModalFormOnHide(event)
}

const registerHandlers = function () {
  $('#signIn').on('submit', onSignIn)
  $('#signUp').on('submit', onSignUp)
  $('#changePassword').on('submit', onChangePassword)
  $('#signOut').on('click', onSignOut)
  $('#createAdventurer').on('submit', onCreateAdventurer)

  $('#signInModal').on('hidden.bs.modal', clearModalFormOnHide)
  $('#signUpModal').on('hidden.bs.modal', clearModalFormOnHide)
  $('#changePasswordModal').on('hidden.bs.modal', clearModalFormOnHide)
  $('#createAdventurerModal').on('hidden.bs.modal', clearModalFormOnHide)

  $('#chooseAdventurerTab').on('shown.bs.tab', setUpChooseAdventurersTab)
  $('#mainGame').on('DOMSubtreeModified', () => {
    $('#continueOnAdventure').off('click')
    $('#continueOnAdventure').on('click', continueGameWithAdventurer)
  })
  $('#userStatsTab').on('shown.bs.tab', setUpUserStatsTab)
}

module.exports = {
  registerHandlers,
  onStartGameWithAdventurer
}
