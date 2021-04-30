import React, { Component, useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal,Text } from "react-native";
import NumericInput from 'react-native-numeric-input'


const TodoInput = (input) => {
  const [text,setText] = useState('');
const [star,setStar] = useState(0);
// const [enteredGoal, setEnteredGoal] = useState({
//   goal: "",
//   star: ""
// });
//   const goalInputHandler = (enteredText,enteredStar) => {
//     setEnteredGoal(goal=enteredText,star=enteredStar);
//   };
  const addGoalHandler = () => {
    input.onAddGoal(text,star);
    setText("");
    setStar(0);
  };
  
  return (
    <Modal visible={input.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Goal"
          style={styles.inputText}
          onChangeText={text => setText(text)}
          value={text}
        ></TextInput>
        <View style={styles.numberInput}>
            <Text>Set a goal number for each day</Text>
            <Text></Text>
        <NumericInput min={0} max={10} value={0} onChange={star => setStar(star)} />
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler}></Button>
          </View>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={input.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },
  numberInput:{
    padding:20,
    marginVertical: 8, 
    marginHorizontal: 16,
    alignItems: "center"
  },
});

export default TodoInput;
