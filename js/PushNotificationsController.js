import React, { Component } from 'react'
import { connect } from 'react-redux'
import PushNotification from 'react-native-push-notification'

import { AppState, Platform } from 'react-native'
import { storeDeviceToken, receivePushNotification, seenAllNotifications, updateBadge } from './actions/index'
import { createSelector } from 'reselect'

class PushNotificationsController extends Component {
  constructor() {
    super()
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }
  handleAppStateChange(appState) {
    if (appState === 'active') {
      this.updateAppBadge()
      if (this.props.tab === 'notifications') {
        this.eventuallyMarkNotificationsAsSeen()
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.enabled && this.props.enabled) {
      PushNotification.requestPermissions()
    }
    if (this.props.badge !== prevProps.badge) {
      this.updateAppBadge()
    }
    if (this.props.tab === 'notifications' && prevProps.tab !== 'notifications') {
      this.eventuallyMarkNotificationsAsSeen()
    }
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)

    const { dispatch } = this.props
    PushNotification.configure({
      onRegister: function(deviceToken) {
        dispatch(storeDeviceToken(deviceToken))
        console.log('token', deviceToken)
      },
      onNotification: function(notification) {
        dispatch(receivePushNotification(notification))
        console.log('notification', notification)
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    this.updateAppBadge()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }
  eventuallyMarkNotificationsAsSeen() {
    const { dispatch } = this.props
    setTimeout(() => dispatch(seenAllNotifications(), 1000))
  }
  updateAppBadge() {
    if (this.props.enabled && Platform.OS === 'ios') {
      PushNotification.setApplicationIconBadgeNumber(this.props.badge)
      updateBadge({badge: this.props.badge})
    }
  }
  render() {
    return null
  }
}

function unseenNotificationsCount(notifications, seen) {
  return notifications.filter((notification) => !seen[notification.id]).length
}

const unseenNotificationsCountSelector = createSelector((store) => store.notifications.pushNotifications, (store) => store.notifications.seen,
unseenNotificationsCount)

function select(store) {
  return {
    enabled: store.notifications.enabled === true,
    badge: unseenNotificationsCountSelector(store),
    tab: store.navigation.tab
  }
}

export default connect(select)(PushNotificationsController)
