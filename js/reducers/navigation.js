import * as types from '../types'

const initialState = { tab: 'schedule' }

export default function navigation(state = initialState, action) {
  switch(action.type) {
    case types.SWITCH_TAB:
      return {...state, tab: action.tab}
    default:
      return state
  }
}
