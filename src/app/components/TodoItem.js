import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity,TouchableHighlight,TouchableNativeFeedback } from "react-native";
import pallate from '../styles/colors'


const colors = ['#f94144','#f3722c','#f8961e','#f9844a','#f9c74f','#90be6d',
'#43aa8b','#4d908e','#577590','#277da1'];

const TodoItem = (props) => {
  return (
    <TouchableNativeFeedback  onPress={props.onDelete.bind(this,props.id)}>
      <View style={{backgroundColor: colors[Math.floor(Math.random()*10)],padding: 10,marginTop:10}}>
        <Text>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  listItems: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fae1dd',
    borderColor: '#e76f51',
    borderWidth: 1,
  },
});

export default TodoItem;
