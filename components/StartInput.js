import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import React, {useState} from 'react';

function StartInput(props){

    return (
    <View style={styles.addItemContainer}>
    <Text>Esta es otra página</Text>
    <Button title="Comenzar" onPress={() => props.onStart(true)}/>
  </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth:1, 
        borderBottomColor: 'black', 
        width:'100%', 
        margin:5,
        fontSize: 20
      },
      addItemContainer: {
        padding: 20,
        width: '90%',
        backgroundColor: "#DDDDDD", 
        borderRadius: 20, 
        margin: 10
      },
})

export default StartInput;