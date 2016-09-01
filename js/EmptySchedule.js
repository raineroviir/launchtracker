'use strict';

import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import React from 'react'

class EmptySchedule extends React.Component {
  render() {
    const image = this.props.image &&
      <Image style={styles.image} source={this.props.image} />;
    const title = this.props.title &&
      <Text style={styles.title}>{this.props.title}</Text>;

    return (
      <View style={[styles.container, this.props.style]}>
        {image}
        {title}
        <Text style={styles.text}>
          {this.props.text}
        </Text>
        {this.props.children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 75,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
  },
});

module.exports = EmptySchedule;
