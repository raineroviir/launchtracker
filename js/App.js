import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  AlertIOS,
  StatusBar,
  AppState,
} from 'react-native';

import PushNotificationsController from './PushNotificationsController'
import { connect } from 'react-redux'
import { shouldFetchSchedule } from './actions/index'
import ScheduleView from './ScheduleView'
import MyNavigator from './MyNavigator'
import NotificationsView from './NotificationsView'
import TabsView from './TabsView'

class App extends Component {
  componentDidMount() {
    const { dispatch, schedule } = this.props
    dispatch(shouldFetchSchedule(schedule))
  }
  render() {
    return (
      <View style={styles.container}>
        <PushNotificationsController />
        <TabsView navigator={this.props.navigator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function select(store) {
  return {
    schedule: store.schedule
  };
}


export default connect(select)(App)
