import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/app/screens/HomeScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import pallate from './src/app/styles/colors';
import AccountScreen from "./src/app/screens/AccountScreen";
import TodoScreen from "./src/app/screens/TodoScreen";
import GoalScreen from "./src/app/screens/GoalScreen";
import DiaryScreen from "./src/app/screens/DiaryScreen";
import TopBar from "./src/app/components/topbar";
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';


function Home() {
  return (
    <HomeScreen />
  );
}

function Todo() {
  return (
    <TodoScreen />
  );
}

function Goal() {
  return (
    <GoalScreen />
  );
}

function Diary() {
  return (
    <DiaryScreen />
  );
}

function Account() {
  return (
    <AccountScreen />
  );
}
function Bottom(){
return(
<Tab.Navigator initialRouteName="Home"
tabBarOptions={{
  activeTintColor: '#e76f51',
}}>
        <Tab.Screen name="Goal" component={Goal} 
        options={{
          tabBarLabel: 'Goal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bullseye" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Todo" component={Todo} 
        options={{
          tabBarLabel: 'Todo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-check" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Home" component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Diary" component={Diary} 
        options={{
          tabBarLabel: 'Diary',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="archive" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Account" component={Account} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>);
}
function BottomNav(){
  return(createStackNavigator({
    tabs:Bottom
  }));
}
function TopNav(){
  return(
<TopBar></TopBar>);
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (    
  
      <NavigationContainer>
        <TopNav></TopNav>
      <Bottom></Bottom>
    </NavigationContainer>
      
  );
}

// import React from 'react'
// import { Provider } from 'react-native-paper'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import { theme } from './app/core/theme'
// import {
//   AuthLoadingScreen,
//   StartScreen,
//   LoginScreen,
//   RegisterScreen,
//   ResetPasswordScreen,
//   Dashboard,
// } from './app/screens'
// import StartScreen from "./app/screens/StartScreen"
// import AuthLoadingScreen from "./app/screens/AuthLoadingScreen"
// import LoginScreen from "./app/screens/LoginScreen"
// import RegisterScreen from "./app/screens/RegisterScreen"
// import ResetPasswordScreen from "./app/screens/ResetPasswordScreen"
// import Dashboard from "./app/screens/Dashboard"
// import { FIREBASE_CONFIG } from './app/core/config'

// const Stack = createStackNavigator();
// if (!firebase.apps.length) {
//   firebase.initializeApp(FIREBASE_CONFIG)
// }

// function Start() {
//   return (
//     <StartScreen />
//   );
// }
// function Login() {
//   return (
//     <LoginScreen />
//   );
// }
// function Register() {
//   return (
//     <RegisterScreen />
//   );
// }
// function ResetPassword() {
//   return (
//     <ResetPasswordScreen />
//   );
// }
// function AuthLoading() {
//   return (
//     <AuthLoadingScreen />
//   );
// }
// function Dash() {
//   return (
//     <Dashboard />
//   );
// }

// export default function App() {
//   return (
//     <Provider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="AuthLoadingScreen"
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <Stack.Screen
//             name="AuthLoadingScreen"
//             component={AuthLoading}
//           />
//           <Stack.Screen name="StartScreen" component={Start} />
//           <Stack.Screen name="LoginScreen" component={Login} />
//           <Stack.Screen name="RegisterScreen" component={Register} />
//           <Stack.Screen name="Dashboard" component={Dash} />
//           <Stack.Screen
//             name="ResetPasswordScreen"
//             component={ResetPassword}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   )
// }

// import { Provider } from 'react-redux';
// import React from 'react';
// import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import { PersistGate } from 'redux-persist/integration/react';
// import { NavigationContainer } from '@react-navigation/native';
// import { colors } from './src/app/styles/colors';

// import { store, persistor } from './src/redux/store';

// import AppView from './src/modules/AppViewContainer';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <PersistGate
//           loading={
//             // eslint-disable-next-line react/jsx-wrap-multilines
//             <View style={styles.container}>
//               <ActivityIndicator color={colors.red} />
//             </View>
//           }
//           persistor={persistor}
//         >
//           <AppView />
//         </PersistGate>
//       </NavigationContainer>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
// });