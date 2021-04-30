import React, { Component } from "react";
import {
  StyleSheet,
} from "react-native";
import GoalScreen from "../screens/GoalScreen";
//import HomeScreen from "../screens/HomeScreen";
import DiaryScreen from "../screens/DiaryScreen";
import AccountScreen from "../screens/AccountScreen";
import TodoScreen from "../screens/TodoScreen";
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}