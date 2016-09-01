import React from 'react'
import { Text, View, Image } from 'react-native'

const LaunchRocket = (props) => (
  <View>
    <Text>
      Rocket Name: {props.rocket.name}
    </Text>
      {props.rocket.agencies.length > 0 ? 
        <Text>Launch Company: {props.rocket.agencies[0].name} </Text>
        : null
      }
    <Image source={{uri: props.rocket.imageURL}} />
  </View>
)

export default LaunchRocket
