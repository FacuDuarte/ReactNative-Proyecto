import './style';

import {
  FlatList,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

import AddItem from './components/AddItem';
import AppLoading from 'expo-app-loading';
import ModalItem  from './components/Modal';
import StartInput from './components/StartInput';
import { useFonts } from 'expo-font';

export default function App() {  
  const [ counter, setCounter ] = useState(3);
  const [ listItem, setListItem ] = useState([{id:1, value:'Juan'},{id:2, value:'Pedro'}]);
  const [ itemSelected, setItemSelected ] = useState({});
  const [ modalVisible, setModalVisible ] = useState(false);
  const [start, setStart] = useState ()

  const [loaded] = useFonts({
    GrapeNuts: require("./assets/fonts/GrapeNuts-Regular.ttf")
  })

  if(!loaded) return <AppLoading/>

  
  const onHandlerDelete = id => { 
      console.log("Item " + itemSelected.value + " Eliminado");
      setListItem( currenItems => currenItems.filter( item => item.id !== id ));
      setItemSelected({});
      setModalVisible(!modalVisible);
  }
  const onHandlerModal = id => {
    setItemSelected(listItem.filter( item => item.id === id)[0]);
    setModalVisible(!modalVisible);
  }  
  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  const agregarItem = (textItem) => {   
    console.log("Se Agrega.");
    if(textItem!=="") {
      console.log("Se agrego el item: " + textItem);
      setListItem( currenItems => 
        [...currenItems, {id: counter, value: textItem}]        
      )
      setCounter(counter + 1);
    }
  }
  
  const renderItem = data => 
      <Text 
        style={styles.listItem} 
        onPress={onHandlerModal.bind(this, data.item.id)}>
          * {data.item.value} ({data.item.id})
      </Text>

  const changeView = data => {
    setStart(data)
  }    

  let inputText = <StartInput onStart={changeView}/>

  if(start) {
    inputText = <AddItem onAddItem={agregarItem}/>
    }
    // // //   inputText =  <StartInput/>
    // <StartInput/>

  return (
    <View style={styles.container}>
      {inputText}      
      <View style={styles.listItemContainer}>
        <FlatList
          data={listItem}
          renderItem={renderItem}
          keyExtractor={ item => item.id }
        />
      </View>
      <ModalItem onDelete={onHandlerDelete} item={itemSelected} visible={modalVisible} onCancel={closeModal}/>
    </View>
  );
}


