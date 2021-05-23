import * as React from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default App;



// STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edc7b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#ac3b61",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#123c69",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#b1b2b5",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"black"
  }
});