import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  Image,
} from 'react-native'
import React from 'react'

import moment from 'moment'
import Button from './Button'
import LaunchLocation from './LaunchLocation'
import LaunchRocket from './LaunchRocket'
import LaunchMissions from './LaunchMissions'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class LaunchCellDetailView extends React.Component {
  constructor() {
    super()
    this.state = {
      weather: 'No data'
    }
  }
  render() {
    const launch = this.props.launch
    console.log(launch.vidURLs[0])
    const normalizedDate = new Date(launch.net)
    const youtubeURL = `https://www.youtube.com/watch?v=njCDZWTI-xg`
    return (
      <ScrollView style={styles.contentContainer}>
        <View style={styles.mainSection}>
          <View style={styles.leftPane}>
          <Text numberOfLines={1} style={styles.launchMonth}>
            {moment(normalizedDate).format('MMMM')}
          </Text>
          <Text numberOfLines={1} style={styles.launchDay}>
            {moment(normalizedDate).format('Do')}
          </Text>
          <Text numberOfLines={1} style={styles.launchTime}>
            {moment(normalizedDate).format('h:mm a')}
          </Text>
          </View>
          <View style={styles.rightPane}>
            <LaunchLocation location={launch.location}/>
          </View>
        </View>
        {/* {(normalizedDate - Date.now() < 3600 && launch.rocket.agencies[0].name === "SpaceX") ?
          <FontAwesome.Button size={60} backgroundColor='red' onPress={this.handleClick.bind(this, youtubeURL)} name="youtube-play"><Text style={{color: 'white'}}>Watch the Launch LIVE!</Text>
          </FontAwesome.Button>
          : null } */}
          {(normalizedDate - Date.now() < 3600 && launch.vidURLs[0]) ? <FontAwesome.Button size={60} backgroundColor='blue' onPress={this.handleClick.bind(this, launch.vidURLs[0])} name="youtube-play">
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={{color: 'white', fontSize: 20}}>Watch the launch LIVE</Text>
              <Text style={{color: 'white', fontSize: 8}}>{launch.vidURLs[0]}</Text>
            </View>
          </FontAwesome.Button>
          : null}
        <View style={styles.detailsSection}>
          <View style={styles.leftPane}>
            <Image style={{width: 50, height: 200}}source={{uri: launch.rocket.imageURL}}></Image>
          </View>
          <View style={styles.rightPane}>
            <LaunchRocket rocket={launch.rocket}/>
            <View style={styles.moreInformationSection}>
            <LaunchMissions missions={launch.missions} />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }
}

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    flex: 1,
    marginTop: 10
  },
  launchDay: {
    color: 'black',
    fontSize: 20,
  },
  launchMonth: {
    color: 'red',
    fontSize: 10,
  },
  leftPane: {
    flexDirection: 'column',
    padding: 5,
    flex: .25,
  },
  rightPane: {
    padding: 5,
    flex: 1
  },
  detailsSection: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moreInformationSection: {
    paddingTop: 10,
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  payload: {
    fontSize: 18,
  },
  launchSite: {
    fontSize: 10,
    color: '#999999'
  },
  launchTime: {
    fontSize: 9,
    color: 'grey'
  },
  separator: {
    paddingTop: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  button: {
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default LaunchCellDetailView
