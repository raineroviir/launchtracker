// import Parse from 'parse/react-native'
import App from './App'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import {Fonts, Metrics, Colors} from './Themes'
import { StatusBar, View, StyleSheet } from 'react-native'
import MyNavigator from './MyNavigator'

import {serverURL} from './env'
import realm from './realm'

const preloadedState = {
  notifications: {
    enabled: realm.objects('Push')[0] ? realm.objects('Push')[0].enabled : false,
    pushNotifications: [],
    registered: false,
    server: [],
    seen: {}
  }
}
const store = configureStore(preloadedState)

export default class Setup extends React.Component {
  render() {
    console.log(store.getState())
    return (
      <Provider store={store}>
        <MyNavigator />
      </Provider>
    )
  }
}

const RootStyle = StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
