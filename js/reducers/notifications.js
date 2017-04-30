import * as types from '../types'
import crc32 from 'crc32'

const initialState = {
  registered: false,
  pushNotifications: [],
  server: [],
  enabled: false,
  seen: {},
  badge: ''
}

export default function notifications(state = initialState, action) {
  switch(action.type) {
    case types.LOADED_NOTIFICATIONS:
      let list = action.list.map(fromParseObject);
      return {...state, server: list};
    case types.REGISTERED_PUSH_NOTIFICATIONS:
      return {...state, registered: true, enabled: true}
    case types.RECEIVED_PUSH_NOTIFICATION:
      return {...state, pushNotifications: append(action.notification, state.pushNotifications)}
    case types.TURNED_ON_PUSH_NOTIFICATIONS:
      return {...state, enabled: true}
    case types.TURNED_OFF_PUSH_NOTIFICATIONS:
      return {...state, enabled: false}
    case types.SEEN_ALL_NOTIFICATIONS:
      return {...state, seen: markAsSeen(state.pushNotifications)}
    case types.UPDATE_APP_BADGE:
      return {...state, badge: action.badge}
    default:
      return state
  }
}

function markAsSeen(notifications) {
  const seen = {}
  notifications.forEach((notification) => {
    seen[notification.id] = true
  })
  return seen
}
function append(notification, list) {
  const id = notification.id || crc32(notification.text + notification.url).toString(36);
  if (list.find((n) => n.id === id)) {
    return list;
  }
  return [{id, ...notification}, ...list];
}

function fromParseObject(object: Object): Notification {
  return {
    id: object.id,
    text: object.get('text'),
    url: object.get('url'),
    time: object.createdAt.getTime(),
  };
}
