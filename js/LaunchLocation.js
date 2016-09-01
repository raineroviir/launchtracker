import React from 'react'
import { View, Text } from 'react-native'

const LaunchLocation = (props) => (
  <View>
    <Text>
      Location: {props.location.name}
    </Text>
    <Text>
      Launch Pad: {props.location.pads[0].name}
    </Text>
  </View>
)

export default LaunchLocation
