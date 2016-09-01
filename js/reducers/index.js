import notifications from './notifications'
import navigation from './navigation'
import schedule from './schedule'

import { combineReducers } from 'redux'
export default combineReducers({
  notifications,
  navigation,
  schedule
})
