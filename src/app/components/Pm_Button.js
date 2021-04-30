import React from 'react'
import PropTypes from 'prop-types';

import { View, Text, Button, StyleSheet } from 'react-native'

export default function Pm_Button({text, onPress}) {
    return (
        <Button title={text} color="orange" style={styles.button} onPress={onPress} />
    )
}


Pm_Button.PropTypes ={
    text:String,
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "orange",
      width: "40%",
    },
  });