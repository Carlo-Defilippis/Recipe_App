import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native"



const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default function MyAppBar() { 
    const navigation = useNavigation()
    const welcomeScreen = () => navigation.navigate("welcome") 

   return (
 <Appbar style={styles.bottom}>
   <Appbar.Action
     icon="home"
     onPress={welcomeScreen}
    />
    <Appbar.Action icon="magnify" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action
      icon="view-list"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar>
 )};