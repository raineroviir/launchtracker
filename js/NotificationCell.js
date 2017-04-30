import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import moment from 'moment'

class NotificationCell extends React.Component {
  render() {
    let attachment;
    if (this.props.notification.url) {
      attachment = <Text style={styles.url}>
      {this.props.notification.url}
      </Text>;
    }
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.cell, !this.props.isSeen && styles.unseen]}>
          <Text style={[styles.text, !this.props.isSeen && styles.unseenText]}>
            {this.props.notification.text}
          </Text>
          {attachment}
          <View style={styles.footer}>
            <Text style={styles.time}>{moment(this.props.notification.time).fromNow()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

var styles = StyleSheet.create({
  cell: {
    padding: 25,
    backgroundColor: 'white',
  },
  unseen: {
    paddingLeft: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#4D99EF',
  },
  text: {
    fontSize: 12,
    fontWeight: '100'
  },
  unseenText: {
    fontSize: 15,
    fontWeight: '900'
  },
  footer: {
    flexDirection: 'row',
  },
  url: {
    flex: 1,
    color: 'blue',
    fontSize: 12,
    marginBottom: 10,
  },
  time: {
    color: 'grey',
    fontSize: 12,
  },
});

function select(store, props) {
  return {
    isSeen: store.notifications.seen[props.notification.id],
  };
}

module.exports = connect(select)(NotificationCell);
