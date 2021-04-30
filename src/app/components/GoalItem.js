import React, {useState} from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import pallate from '../styles/colors'

const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f', '#90be6d',
  '#43aa8b', '#4d908e', '#577590', '#277da1'];

const GoalItem = (props) => {
  var stars = [];
  const [currentStar,setCurrentStar] = useState(0);
  for (let i = 0; i < props.index; i++) {
    if (i >= currentStar) {
      stars.push(
        <Icon size={30} name="staro" />
      )
    }
    else {
      stars.push(
        <Icon size={30} name="star" />
      )
    }
  }
  const setCurrent = () => {
    var newStar = currentStar;
    setCurrentStar(newStar+=1);
  }
  return (
    <TouchableNativeFeedback onPress={setCurrent}>
      <View style={{ backgroundColor: colors[Math.floor(Math.random() * 10)], padding: 10, marginBottom: 10, flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
        <Text>{props.title}</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "flex-end" }}>{stars}</View>

      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  listItems: {
    padding: 10,
    margin: 10,

  },
});

export default GoalItem;
