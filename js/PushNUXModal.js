import Button from './Button'
import {
  View,
  StyleSheet
} from 'react-native'
import React from 'react'

class PushNUXModal extends React.Component {
  props: {
    style: any;
    onTurnOnNotifications: () => void;
    onSkipNotifications: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Button
              style={styles.button}
              type="primary"
              caption="Turn on push notifications"
              onPress={this.props.onTurnOnNotifications}
            />
            <Button
              style={styles.button}
              type="secondary"
              caption="No thanks"
              onPress={this.props.onSkipNotifications}
            />
          </View>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 49,
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inner: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  image: {
    alignSelf: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
  },
  page: {
    borderTopWidth: 1,
    paddingTop: undefined,
    paddingBottom: 0,
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch',
  },
});
