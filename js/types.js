type ParseObject = Object
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export const REGISTERED_PUSH_NOTIFICATIONS = 'REGISTERED_PUSH_NOTIFICATIONS'
export const LOADED_NOTIFICATIONS = 'LOADED_NOTIFICATIONS'
export const RECEIVED_PUSH_NOTIFICATION = 'RECEIVED_PUSH_NOTIFICATION'
export const SWITCH_TAB = 'SWITCH_TAB'
export const TURNED_ON_PUSH_NOTIFICATIONS = 'TURNED_ON_PUSH_NOTIFICATIONS'
export const RECEIVE_SCHEDULE = 'RECEIVE_SCHEDULE'
export const SEEN_ALL_NOTIFICATIONS = 'SEEN_ALL_NOTIFICATIONS'
