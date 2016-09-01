import {
  View,
  ListView,
  Linking,
} from 'react-native'
import { connect } from 'react-redux'
import React from 'react'
import { createSelector } from 'reselect'

import turnOnPushNotifications from './actions/index'
import PushNUXModal from './PushNUXModal'
import allNotifications from './allNotifications'
import PureListView from './PureListView'
import EmptySchedule from './EmptySchedule'
import NotificationCell from './NotificationCell'
import LaunchCellDetailView from './LaunchCellDetailView'

class NotificationsView extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this); this.openNotification.bind(this);
  }
  renderRow(notification) {
    return (
      <NotificationCell
      key={notification}
      notification={notification}
      onPress={() => this.openNotification(notification)}
      />
    )
  }
  renderEmptyList() {
    return (
      <EmptySchedule
        title="No notifications right now"
        text="You're all caught up!"
      />
    )
  }
  openNotification(notification) {
    const launch = this.props.upcomingLaunch
    this.props.navigator.push({
      component: LaunchCellDetailView,
      title: launch.name,
      passProps: {launch: launch}
    })
  }
  render() {
    console.log(this.props.notifications)
    let modal;
    if (this.props.nux) {
      modal = (
        <PushNUXModal onTurnOnNotifications={this.props.onTurnOnNotifications}  onSkipNotifications={this.props.onSkipNotifications} />
      )
    }
    return (
      <View style={{flex: 1}}>
        <PureListView
        data={this.props.notifications}
        renderEmptyList={this.renderEmptyList}
        renderRow={this.renderRow}
        />
        {modal}
      </View>
    )
  }
}

function select(store) {
  return {
    notifications: store.notifications.pushNotifications,
    upcomingLaunch: upcomingLaunchSelector(store)
  }
}

function actions(dispatch) {
  return {
    onTurnOnNotifications: () => dispatch(turnOnPushNotifications()),
    dispatch,
  }
}

const upcomingLaunchSelector = createSelector(
  store => store.schedule.launches,
  (schedule) => schedule[0]
)

export default connect(select, actions)(NotificationsView)
