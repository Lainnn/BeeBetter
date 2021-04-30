import React from "react";
import { Text, View, ImageBackground, StyleSheet, Button } from "react-native";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { createStackNavigator, createAppContainer } from "react-navigation";

class Welcome extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      >
        <View style={styles.container}>
          <Text>Welcome</Text>
          <Text>Have you used this app before?</Text>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title="Yes"
                color="orange"
                style={styles.button}
                onPress={() => this.props.navigation.navigate({LoginScreen})}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title="No"
                color="orange"
                style={styles.button}
                onPress={() => this.props.navigation.navigate({RegisterScreen})}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const AppNavigator = createStackNavigator();

export default class WelcomeScreen extends React.Component {
  render() {
    return createAppContainer(Welcome);
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 50,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    padding: 10
  },
});
//export default WelcomeScreen;
