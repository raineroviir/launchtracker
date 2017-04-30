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

import Button from './Button'
import URLButton from './URLButton'
// import IconSet from 'react-native-vector-icons/FontAwesome'

class LaunchCellDetailView extends React.Component {
  constructor() {
    super()
    this.state = {
      weather: 'No data'
    }
  }
  componentDidMount() {
  }
  render() {
    const weatherReportAvailable = <View><Text>Weather: Launch day probability of violating launch weather constraints: {this.state.weather.percent}%
    </Text>
    <Text>Source: </Text>
    <URLButton
      url={this.state.weather.url}
      buttonText={'Full Weather Report'}
      viewStyle={{padding: 10,
        backgroundColor: '#3B5998',
        marginBottom: 10, }}/>
    </View>
    const noLaunch = <View><Text>Weather: Weather report not available, check back closer to launch day</Text></View>
    return (
      <ScrollView style={styles.contentContainer}>
        <View style={styles.mainSection}>
          <View style={styles.leftPane}>
          <Text style={styles.launchMonth}>
            {this.props.launch.date.replace(/\d/g, '').replace(/^\s+|\s+$|\s+(?=\s)/g, "").toUpperCase()}
          </Text>
          <Text style={styles.launchDay}>
            {this.props.launch.date.match(/\d{2}/)}
          </Text>
          </View>
          <View style={styles.rightPane}>
            <Text style={styles.payload}>
            Launch of {this.props.launch.payload}
            </Text>
            <Text style={styles.launchSite}>
            From {this.props.launch.launchSite}
            </Text>
          </View>
        </View>
        <URLButton
          url={`https://www.youtube.com/spacex/live`}
          buttonText={'Watch LIVE on YouTube!'}
          viewStyle={{backgroundColor: '#3B5998',
          marginBottom: 10,
          padding: 10,}}/>
        <View style={styles.separator}><Text>Details</Text></View>
        <View style={styles.detailsSection}>
          {/* {!this.state.weather.noLaunch && this.state.weather !== 'No Data'? weatherReportAvailable : noLaunch} */}
          <Text>Rocket: {this.props.launch.vehicle.trim()}</Text>
          <Text>Payload: {this.props.launch.payload.trim()}</Text>
          <Text>Customer: {this.props.launch.customer.trim()}</Text>
          <Text>Orbit: {this.props.launch.orbit.trim()}</Text>
          <Text>Payload Mass(kg): {this.props.launch.mass.replace(/([.*+?^=!:${}|\[\]\/\\])/g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, "")}</Text>
          <View style={styles.moreInformationSection}>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    )
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
    fontSize: 18,
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
    borderWidth: StyleSheet.hairlineWidth,
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
