// Using curl for sending email but can use Nodemailer for NodeJS

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Image 
} from 'react-native';

// const curl = new (require( 'curl-request' ))();
// curl.setHeaders([
//   'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
// ])

export default class login extends React.Component {

  state={
    username:"",
    password:"",
    isLoggedIn: false
  }

  loginbtn(){
    let username='admin';
    let password='admin';

    if(this.state.username===username && this.state.password===password){
      this.setState({ isLoggedIn: true })
    }
    else{
      alert("Incorrect Username or Password");
      this.setState({ isLoggedIn: false })
    }

  }

  render(){
    /**
   * Simple routing.
   * If the user is authenticated (isLoggedIn) show the LoginScreen, otherwise show the otherscreen
   * https://github.com/mmazzarolo/react-native-login-animation-example/blob/master/src/app.js
   */
    if(!this.state.isLoggedIn){
      return (
        
        <View style={styles.container}>
          {/* <Image style={styles.image} source={require('./logo_size.jpg')} /> */}
          <Text style={styles.logo}>WorkForce</Text>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Enter Username" 
              placeholderTextColor="white"
              
              onChangeText={text => this.setState({username:text})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Enter Password" 
              placeholderTextColor="white"
              onChangeText={text => this.setState({password:text})}/>
          </View>
          {/* <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity> */}
  
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginbtn()}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
  
          {/* <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity> */}
  
    
        </View>
      );
      
    }
    else{
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      );
    }
    }
  }


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