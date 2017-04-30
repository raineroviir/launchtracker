import React from 'react'
import { View, Switch, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { turnOnPushNotifications } from './actions/index'
import { turnOffPushNotifications } from './actions/index'

class SettingsView extends React.Component {
  switch() {
    const { dispatch } = this.props
    if (this.props.enabled) {
      dispatch(turnOffPushNotifications())
    } else {
      dispatch(turnOnPushNotifications())
    }
  }
  render() {
    const { dispatch } = this.props
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.leftPane}>Enable Push Notifications</Text>
        <Switch style={styles.rightPane}
          onValueChange={this.switch.bind(this)}
          value={this.props.enabled}
        />
      </View>
    )
  }
}

function select(store) {
  return {
    enabled: store.notifications.enabled
  }
}

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    flex: 1,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftPane: {
    padding: 5,
  },
  rightPane: {
    padding: 5,
  },
});

export default connect(select)(SettingsView)
