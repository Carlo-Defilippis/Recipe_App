import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/LoginRedux'

test('attempt', (t) => {
  const state = reducer(INITIAL_STATE, Actions.loginRequest('u', 'p'))

  expect(state.fetching).toBe(true)
})

test('success', (t) => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))

  expect(state.username).toBe('hi')
})

test('failure', (t) => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(69))

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(69)
})

test('logout', (t) => {
  const loginState = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))
  const state = reducer(loginState, Actions.logout())

  expect(state.username).toBe(false)
})
