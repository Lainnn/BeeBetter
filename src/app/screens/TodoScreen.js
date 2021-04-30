import React, {Component} from 'react';
import { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import pallate from "../../styles/colors";
// import colors from '../constants/colors';

export default function TodoScreen() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button color='#e76f51' title="Add new todo" onPress={() => setIsAddMode(true) } />
      <TodoInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <TodoItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 50,
    backgroundColor: "#f8edeb"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
