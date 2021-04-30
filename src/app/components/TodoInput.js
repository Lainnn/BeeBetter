import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal } from "react-native";

const GoalInput = (input) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };
  const addGoalHandler = () => {
    input.onAddGoal(enteredGoal);
    setEnteredGoal("");
  };
  return (
    <Modal visible={input.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="To-do"
          style={styles.inputText}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        ></TextInput>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler}></Button>
          </View>
          <View style={styles.button}>
            <Button
              title="CANCEL"
              color="red"
              onPress={input.onCancel}
            />
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
});

export default GoalInput;
