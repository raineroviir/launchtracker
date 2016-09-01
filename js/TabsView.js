import {
  TabBarIOS,
  StatusBarIOS,
  Navigator,
  View,
  Text,
} from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import { switchTab } from './actions'
import NotificationsView from './NotificationsView'
import ScheduleView from './ScheduleView'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class TabsView extends React.Component {
  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab)
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <TabBarIOS>
          <Icon.TabBarItem
            title="Notifications"
            selected={this.props.tab === 'notifications'}
            onPress={this.onTabSelect.bind(this, 'notifications')}
            iconName="ios-notifications"
            >
            <NotificationsView navigator={this.props.navigator} />
          </Icon.TabBarItem>
          <FontAwesome.TabBarItem
            title="Upcoming Launches"
            selected={this.props.tab === 'schedule'}
            onPress={this.onTabSelect.bind(this, 'schedule')}
            iconName="rocket"
            >
            <ScheduleView navigator={this.props.navigator} />
          </FontAwesome.TabBarItem>
        </TabBarIOS>
      </View>
    )
  }
}

function select(store) {
  return {
    tab: store.navigation.tab
  }
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab))
  }
}

export default connect(select, actions)(TabsView)
