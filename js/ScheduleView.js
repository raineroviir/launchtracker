import {
  View,
  ListView,
  Linking,
  Platform,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import React from 'react'

import PushNUXModal from './PushNUXModal'
import { createSelector } from 'reselect'
import allNotifications from './allNotifications'
import LaunchCell from './LaunchCell'
import LaunchCellDetailView from './LaunchCellDetailView'
import PureListView from './PureListView'
import EmptySchedule from './EmptySchedule'

class ScheduleView extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.openLaunch.bind(this);
  }

  renderRow(launch) {
    return (
      <LaunchCell
        style={{fontSize: 12}}
        key={launch.id}
        onSelect={() => this.openLaunch(launch)}
        launch={launch}
      />
    )
  }

  renderEmptyList() {
    return (
      <EmptySchedule
        title="No Launches Yet"
        text="Important updates and announcements will appear here"
      />
    )
  }
  openLaunch(launch) {
    console.log(launch)
    this.props.navigator.push({
      component: LaunchCellDetailView,
      title: launch.name,
      passProps: {launch: launch}
    })
  }
  render() {
    console.log(this.props)
    return (
      <View style={{flex: 1}}>
        <PureListView
          data={this.props.schedule}
          renderEmptyList={this.renderEmptyList}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

function select(store) {
  return {
    schedule: store.schedule.launches
  }
}

export default connect(select)(ScheduleView)
