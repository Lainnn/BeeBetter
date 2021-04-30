import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
class TopBar extends React.Component {
    render() {
      return (
        <SafeAreaView>
        <View style={styles.container}>
          <Text> </Text>
          <Text style={{fontSize:25, color:"#e76f51",fontWeight:'bold'}}>Bee Better</Text>
          <Text> </Text>
        </View></SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      height: 80,
      fontSize:20,
      flexDirection: 'row', // row
      backgroundColor: '#ffe5d9',
      alignItems: 'center',
      justifyContent: 'space-between', // center, space-around
      paddingLeft: 10,
      paddingRight: 10
    }
  });
  
  export default TopBar;