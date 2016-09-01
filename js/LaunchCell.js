import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

class LaunchCell extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.launchTitle} numberOfLines={2}>
                {this.props.launch.name}
              </Text>
              <Text style={styles.launchDate} numberOfLines={1}>
                {moment(new Date(this.props.launch.net)).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  launchTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  launchDate: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

export default LaunchCell
