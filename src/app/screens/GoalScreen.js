import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from "react-native";
import GoalInput from "../components/GoalInput";
import GoalItem from "../components/GoalItem";
import { useState } from "react";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';



// const Item = ({ title, index }) => (
//   <View style={{backgroundColor: colors[index % colors.length],padding: 20,marginVertical: 8, marginHorizontal: 16}}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );
const colors = [
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9844a",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#577590",
  "#277da1",
];

const actions = [
  {
    text: "Accessibility",
    name: "bt_accessibility",
    position: 2,
  },
  {
    text: "Language",
    name: "bt_language",
    position: 1,
  },
  {
    text: "Location",
    name: "bt_room",
    position: 3,
  },
  {
    text: "Video",
    name: "bt_videocam",
    position: 4,
  },
];

export default function GoalScreen() {
  const [goals, setGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle,star) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle, number: star},
    ]);
    setIsAddMode(false);
  };
  const removeGoalHandler = (goalId) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  const renderItem = (itemData, i) => (
    <GoalItem
      style={{ backgroundColor: colors[i % colors.length] }}
      onDelete={removeGoalHandler}
      title={itemData.item.value}
      index={itemData.item.number}
    />
  );

  return (
      <View style={styles.screen}>
        <FlatList
        keyExtractor={(item, index) => item.id}
        data={goals}
        renderItem={renderItem} />
        <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <ActionButton buttonColor="#e76f51">
          <ActionButton.Item buttonColor='#9b59b6' title="New Goal" onPress={() => setIsAddMode(true)}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Goals" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
   // </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    padding: 50,
    backgroundColor: '#f8edeb'
  },
  title: {
    fontSize: 32,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
