/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

import {
  NavigatorIOS,
  StyleSheet,
  ActivityIndicatorIOS,
  PushNotificationIOS,
  AlertIOS,
} from 'react-native'
import React from 'react'

import App from './App'

class MyNavigator extends React.Component {

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Launch Tracker',
          component: App,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = MyNavigator;
