import * as types from '../types'
import { Platform, VibrationIOS } from 'react-native'

import {serverURL} from '../env'
import type { ThunkAction } from './types'
import PushNotification from 'react-native-push-notification'
import realm from '../realm'

// export async function updateInstallation(updates) {
//   const installation = await currentInstallation()
//   installation.save(updates)
// }
//

function createInstallation(installation): Object {
  const url = `http://${serverURL}/installation`
  return fetch(url, {method: 'post', body: installation}).then(response => console.log(response))
}

async function currentInstallation() {
  const installationId = realm.objects('Installation')[0].id
  console.log(installationId)

  return createInstallation({installationId: installationId, pushEnabled: true})

  // return new Parse.Installation({
  // installationId,
  // appName: 'spacexp',
  // deviceType: Platform.OS,
  // appIdentifier: 'com.example.AwesomeSpaceXperience'
  // })
}

export async function storeDeviceToken(deviceToken) {
  await updateInstallation(deviceToken)
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
    console.log(notification)
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

export function turnOnPushNotifications() {
  let myPushStatus = realm.objects('Push')[0]
  realm.write(() => {
    myPushStatus.enabled = true
  })
  return {
    type: types.TURNED_ON_PUSH_NOTIFICATIONS,
  }
}

export async function turnOffPushNotifications() {
  // await PushNotification.abandonPermissions()
  let myPushStatus = realm.objects('Push')[0]
  realm.write(() => {
    myPushStatus.enabled = false
  })
  return {
    type: types.TURNED_OFF_PUSH_NOTIFICATIONS
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
