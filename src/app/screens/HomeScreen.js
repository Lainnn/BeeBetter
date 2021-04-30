import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"#f8edeb" }}>
        <Text style={{fontWeight:'bold',fontSize: 30}}> Welcome! </Text>
      </View>
    )
  }
}
