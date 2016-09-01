import React from 'react'
import { View, Text } from 'react-native'

const LaunchMissions = (props) => (
  <View>
    <Text>
      Mission Description: {props.missions[0].description}
    </Text>
    <Text>
      Mission Type: {props.missions[0].typeName}
    </Text>
  </View>
)

export default LaunchMissions
