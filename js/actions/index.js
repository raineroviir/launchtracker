import * as types from '../types'
import Parse from 'parse/react-native'
import { Platform, VibrationIOS } from 'react-native'

import {serverURL} from '../env'
import type { ThunkAction } from './types'

const Notification = Parse.Object.extend('Notification');

export async function updateInstallation(updates: Object = {}): Promise<void> {
  const installation = await currentInstallation()
  installation.save(updates)
}

async function currentInstallation(): Promise<Parse.Installation> {
  const installationId = await Parse._getInstallationId()
  return new Parse.Installation({
  installationId,
  appName: 'spacexp',
  deviceType: Platform.OS,
  // TODO: Get this information from the app itself
  appIdentifier: 'com.example.AwesomeSpaceXperience'
  })
}

export async function storeDeviceToken(deviceToken) {
  await updateInstallation({
    pushType: deviceToken.os,
    deviceToken: deviceToken.token,
    deviceTokenLastModified: Date.now(),
  })
  return {
    type: types.REGISTERED_PUSH_NOTIFICATIONS,
  }
}

function normalizeData(s: string | Object): Object {
  if (s && typeof s === 'object') {
    return s;
  }
  try {
    return JSON.parse(s);
  } catch (e) {
    return {};
  }
}

export function loadNotifications() {
  query = new Parse.Query(Notification)
  return (dispatch) => {
    return query.find({
      success: (list) => {
        console.log('LOADED LIST', list)
        InteractionManager.runAfterInteractions(() => {
          dispatch(receiveNotifications(list))
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

function receiveNotifications(list) {
  return {
    type: types.LOADED_NOTIFICATIONS,
    list
  }
}

export function receivePushNotification(notification): ThunkAction {
  return (dispatch) => {
        console.log('FROM ACTIONS IS THE NOTIFICATION OBJECT:',notification)
    const {foreground} = notification
    const message = notification.message || notification.data.message
    const data = normalizeData(notification.data)

    if (!foreground) {
      dispatch(switchTab('notifications'))
    }

    if (foreground) {
      dispatch(switchTab('notifications'))
    }
    if (Platform.OS === 'ios') {
      VibrationIOS.vibrate()
    }

    if (data.e) {
      console.log(e)
      return
    }
    const timestamp = new Date().getTime()
    dispatch({
      type: types.RECEIVED_PUSH_NOTIFICATION,
      notification: {
        text: message,
        url: data.url,
        launch: data.launch,
        time: timestamp,
      }
    })
  }
}

export function switchTab(tab) {
  return {
    type: types.SWITCH_TAB,
    tab
  }
}

export function turnOnPushNotifications(): Action {
  console.log('turnOnPushNotifications')
  return {
    type: types.TURNED_ON_PUSH_NOTIFICATIONS,
  }
}

export function shouldFetchSchedule(schedule) {
  return (dispatch) => {
    let currentDate = Date.now() - 86400
    if (schedule.lastFetchDate < currentDate) {
      dispatch(fetchSchedule())
    } else {
      return console.log('already fetched today')
    }
  }
}

export function fetchSchedule() {
  return (dispatch) => {
    const urlForSchedule = `https://launchlibrary.net/1.2/launch/next/5`
    fetch(urlForSchedule).then(response => response.json())
    .then(body => {
      dispatch(receiveSchedule(body))
    })
  }
}

export function seenAllNotifications() {
  return {
    type: types.SEEN_ALL_NOTIFICATIONS
  }
}

function receiveSchedule(schedule) {
  return {
    type: types.RECEIVE_SCHEDULE,
    schedule
  }
}
