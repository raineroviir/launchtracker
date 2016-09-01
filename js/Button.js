import {
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

import React from 'react'
let Button = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
});

let styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  buttonLabel: {
    color: 'white',
  },
});

export default Button
