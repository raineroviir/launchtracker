import * as types from '../types'

const initialState = {
  launches: [],
  lastFetchDate: null
}

export default function schedule(state=initialState: State, action) {
  switch (action.type) {
    case types.RECEIVE_SCHEDULE: {
      return { ...state, launches: action.schedule.launches, lastFetchDate: Date.now() }
    }
    case 'LOGGED_OUT':
      return {};
    default:
      return state
  }
}
