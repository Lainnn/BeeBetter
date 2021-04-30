import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider } from "react-native-elements";
import { enableScreens } from "react-native-screens";

import ThemeLoader from "../ThemeLoader";
import StatsScreen from "./Mood/StatsScreen";
import HomeScreen from "./Mood/HomeScreen";
import TagScreen from "./Mood/TagScreen";
import RatingScreen from "./Mood/RatingScreen";
import NewTagScreen from "./Mood/NewTagScreen";
import ThemedBottomBar from "../components/navigationComponents/ThemedBottomBar";
import DrawerMenu from "../components/navigationComponents/DrawerMenu";

import { theme, getTheme, themeColors } from "../themes/themes";
import { Drawer } from "react-native-paper";

enableScreens();

// Stack navigator for creating a new entry. Rating Screen -> TagScreen -> (optional new tag screen to add tags while rating).
const NewEntryStack = createStackNavigator(
  {
    NewEntry: RatingScreen,
    NewTag: NewTagScreen,
    Tags: TagScreen
  },
  {
    // we don't want to display a header.
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      headershown: false
    }
  }
);

// Configuration settings for all the routes (tabs) on the tab bar.
const routeConfig = {
  // Will also eventually need a stack navigator, to navigate to editing an entry.
  Entries: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Entries"
    })
  },
  // New entry uses the above stack navigator, as it flows through several different screens.
  NewEntry: {
    screen: NewEntryStack,
    navigationOptions: ({ navigation }) => ({
      title: "New Entry"
    })
  },
  Stats: StatsScreen,
};

// Configuration for the navigation bar.
const NavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      // Displays a different FA Icon based on the route name.
      const { routeName } = navigation.state;
      let iconName = "book";
      if (routeName === "Entries") {
        iconName = "book";
      } else if (routeName === "Stats") {
        iconName = "pie-chart";
      } else if (routeName === "NewEntry") {
        iconName = "plus-circle";
      } else if (routeName === "Tags") {
        iconName = "bookmark"; // temporary, should only be accessed through new entries.
      } else if (routeName === "More") {
        iconName = "wrench";
      }
      return <FontAwesome name={iconName} size={24} color={tintColor} />;
    }
  }),
  // Our custom themed bar.
  tabBarComponent: ThemedBottomBar,
  // Initial route is the homescreen, entries.
  initialRouteName: "Entries"
};

// Create a bottom tab navigator from the above routes & configuration settings.
const BottomTabNavigator = createBottomTabNavigator(
  routeConfig,
  NavigatorConfig
);

const DrawerNavigatorConfig = {
  intialRouteName: 'Entries',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: 'white',
    },
  },
  contentOptions: {
    // add your styling here 
    activeTintColor: '#e76f51',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },
  drawerBackgroundColor: '#f8edeb', // sets background color of drawer
};

// Create a drawer navigator that contains the bottom tab navigator, and our component to render the drawer navigator (that opens when the "More" tab is pressed).
const DrawerNavigator = createDrawerNavigator(routeConfig,DrawerNavigatorConfig)
    // Entries: {
    //     screen: HomeScreen,
    //     navigationOptions: ({ navigation }) => ({
    //       title: "Entries",
    //     })
    //   },
    //   // New entry uses the above stack navigator, as it flows through several different screens.
    //   NewEntry: {
    //     screen: NewEntryStack,
    //     navigationOptions: ({ navigation }) => ({
    //       title: "New Entry"
    //     })
    //   },
    //   // Will also need a stack navigator eventually to navigate between different stats pages.
    //   Stats: StatsScreen,
    ;

// Combine them through the magic of create app container.
const AppContainer = createAppContainer(DrawerNavigator);

// Wrap our app container in the theme provider to provide the theme.
class DiaryScreen extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme} style={{backgroundColor:"#f8edeb"}}>
        <AppContainer  />
        <ThemeLoader />
      </ThemeProvider>
    );
  }
}

export default DiaryScreen;